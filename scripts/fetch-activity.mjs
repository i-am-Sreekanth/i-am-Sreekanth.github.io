// Fetches GitHub contributions + LeetCode submissions into src/data/activity.json.
// Runs before dev/build. On any failure the previous file is kept, so builds never break offline.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const GITHUB_USER = "i-am-Sreekanth";
const LEETCODE_USER = "SreekanthR0952";
const OUT = new URL("../src/data/activity.json", import.meta.url);

const iso = (d) => d.toISOString().slice(0, 10);
const today = new Date();
const from = new Date(today);
from.setUTCFullYear(from.getUTCFullYear() - 1);

async function github() {
  const url = `https://github.com/users/${GITHUB_USER}/contributions?from=${iso(from)}&to=${iso(today)}`;
  const html = await (await fetch(url, { headers: { "User-Agent": "portfolio-build" } })).text();
  const counts = {};
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = m[2].match(/^(\d+) contribution/);
    counts[m[1]] = n ? Number(n[1]) : 0;
  }
  const days = [];
  for (const m of html.matchAll(
    /<td[^>]*data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*data-level="(\d)"/g,
  )) {
    days.push({ date: m[1], count: counts[m[2]] ?? 0, level: Number(m[3]) });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length) throw new Error("no github days parsed");
  return { user: GITHUB_USER, total: days.reduce((s, d) => s + d.count, 0), days };
}

const lcLevel = (n) => (n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : 4);

async function leetcode() {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({
      query: `query($u:String!){matchedUser(username:$u){userCalendar{streak totalActiveDays submissionCalendar}
        submitStats{acSubmissionNum{difficulty count}}}}`,
      variables: { u: LEETCODE_USER },
    }),
  });
  const u = (await res.json()).data.matchedUser;
  const cal = JSON.parse(u.userCalendar.submissionCalendar);
  const bySecond = {};
  for (const [ts, n] of Object.entries(cal)) bySecond[iso(new Date(Number(ts) * 1000))] = n;
  const days = [];
  for (let d = new Date(from); d <= today; d.setUTCDate(d.getUTCDate() + 1)) {
    const count = bySecond[iso(d)] ?? 0;
    days.push({ date: iso(d), count, level: lcLevel(count) });
  }
  const solved = Object.fromEntries(
    u.submitStats.acSubmissionNum.map((x) => [x.difficulty.toLowerCase(), x.count]),
  );
  return {
    user: LEETCODE_USER,
    total: days.reduce((s, d) => s + d.count, 0),
    activeDays: u.userCalendar.totalActiveDays,
    streak: u.userCalendar.streak,
    solved,
    days,
  };
}

async function repos() {
  const list = await (
    await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, {
      headers: { "User-Agent": "portfolio-build" },
    })
  ).json();
  if (!Array.isArray(list)) throw new Error("repo list unavailable");
  return Object.fromEntries(
    list.map((r) => [
      r.name,
      { stars: r.stargazers_count, language: r.language, pushed: r.pushed_at.slice(0, 10) },
    ]),
  );
}

const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const next = { ...prev, updated: iso(today) };
for (const [key, fn] of [
  ["github", github],
  ["leetcode", leetcode],
  ["repos", repos],
]) {
  try {
    next[key] = await fn();
    console.log(`[activity] ${key}: ok `);
  } catch (e) {
    console.warn(`[activity] ${key}: failed, keeping previous data (${e.message})`);
  }
}
writeFileSync(OUT, JSON.stringify(next));
