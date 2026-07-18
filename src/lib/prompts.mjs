export function buildPrompts(scenario) {
  const task = scenario.task.trim();
  const quotedTask = JSON.stringify(task);
  const shared = [
    "Work directly in the repository and complete the task end to end.",
    "Run the complete test suite before finishing.",
    "Keep changes narrowly scoped and do not rewrite tests to make them pass.",
    "",
    "TASK",
    task
  ].join("\n");

  const control = [
    "BENCHMARK ARM: CONTROL",
    "This run measures normal Codex repository exploration without Vertex Palace.",
    "Do not call palace_* tools, the palace CLI, or inspect any .palace data.",
    "Use the repository inspection methods you would normally choose.",
    "",
    shared
  ].join("\n");

  const palace = [
    "BENCHMARK ARM: VERTEX PALACE",
    "This run isolates Vertex Palace task-context routing from post-task maintenance.",
    `Before ordinary repository exploration, run exactly one Vertex Palace preparation command: palace context ${quotedTask} --budget 6000 --route-limit 8 --max-drawers 4`,
    "The context command automatically initializes, refreshes a stale index, routes the task, and includes relevant pitfalls in a compact pack.",
    "Do not call palace status, init, index, route, pack, help, open, evaluate, or memory separately during this benchmark arm.",
    "Inspect routed files first. Post-task evaluation, memory writing, and index maintenance are intentionally outside this timed routing comparison.",
    "",
    shared
  ].join("\n");

  return { task, control, palace };
}
