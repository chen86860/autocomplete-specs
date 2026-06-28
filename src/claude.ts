const icon =
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude.png";

const outputFormats = ["text", "json", "stream-json"];
const inputFormats = ["text", "stream-json"];
const permissionModes = [
  "acceptEdits",
  "auto",
  "bypassPermissions",
  "default",
  "dontAsk",
  "plan",
];

const commonOptions: Fig.Option[] = [
  {
    name: "--add-dir",
    description: "Additional directories to allow tool access to",
    args: { name: "directory", template: "folders", isVariadic: true },
  },
  {
    name: "--agent",
    description: "Agent for the current session",
    args: { name: "agent" },
  },
  {
    name: "--agents",
    description: "JSON object defining custom agents",
    args: { name: "json" },
  },
  {
    name: "--allowedTools",
    description: "Tools to allow",
    args: { name: "tools", isVariadic: true },
  },
  {
    name: "--allowed-tools",
    description: "Tools to allow",
    args: { name: "tools", isVariadic: true },
  },
  {
    name: "--disallowedTools",
    description: "Tools to deny",
    args: { name: "tools", isVariadic: true },
  },
  {
    name: "--disallowed-tools",
    description: "Tools to deny",
    args: { name: "tools", isVariadic: true },
  },
  {
    name: "--tools",
    description: "Specify the list of available tools",
    args: { name: "tools", isOptional: true },
  },
  {
    name: "--append-system-prompt",
    description: "Append a system prompt to the default system prompt",
    args: { name: "prompt" },
  },
  {
    name: "--system-prompt",
    description: "System prompt to use for the session",
    args: { name: "prompt" },
  },
  {
    name: "--mcp-config",
    description: "Load MCP servers from JSON files or strings",
    args: { name: "config", isVariadic: true },
  },
  {
    name: "--strict-mcp-config",
    description: "Only use MCP servers from --mcp-config",
  },
  {
    name: "--settings",
    description: "Path to a settings JSON file or JSON string",
    args: { name: "file-or-json", template: "filepaths" },
  },
  {
    name: "--setting-sources",
    description: "Comma-separated setting sources to load",
    args: { name: "sources", suggestions: ["user", "project", "local"] },
  },
  {
    name: "--plugin-dir",
    description: "Load a plugin from a directory or .zip",
    args: { name: "path", template: "filepaths" },
  },
  {
    name: "--plugin-url",
    description: "Fetch a plugin .zip from a URL",
    args: { name: "url" },
  },
  {
    name: "--model",
    description: "Model for the current session",
    args: { name: "model", suggestions: ["fable", "opus", "sonnet"] },
  },
  {
    name: "--fallback-model",
    description: "Fallback model(s) to try when the default is unavailable",
    args: { name: "model" },
  },
  {
    name: "--effort",
    description: "Effort level for the current session",
    args: {
      name: "level",
      suggestions: ["low", "medium", "high", "xhigh", "max"],
    },
  },
  {
    name: "--permission-mode",
    description: "Permission mode to use for the session",
    args: { name: "mode", suggestions: permissionModes },
  },
  {
    name: "--dangerously-skip-permissions",
    description: "Bypass all permission checks",
  },
  {
    name: "--allow-dangerously-skip-permissions",
    description: "Make bypass-permissions mode available",
  },
  {
    name: ["-c", "--continue"],
    description: "Continue the most recent conversation",
  },
  {
    name: ["-r", "--resume"],
    description: "Resume a conversation",
    args: { name: "session", isOptional: true },
  },
  {
    name: "--fork-session",
    description: "Create a new session ID when resuming",
  },
  {
    name: "--from-pr",
    description: "Resume a session linked to a PR",
    args: { name: "value", isOptional: true },
  },
  {
    name: "--session-id",
    description: "Use a specific session ID",
    args: { name: "uuid" },
  },
  {
    name: ["-p", "--print"],
    description: "Print response and exit",
  },
  {
    name: "--input-format",
    description: "Input format",
    args: { name: "format", suggestions: inputFormats },
  },
  {
    name: "--output-format",
    description: "Output format",
    args: { name: "format", suggestions: outputFormats },
  },
  {
    name: "--json-schema",
    description: "JSON Schema for structured output validation",
    args: { name: "schema" },
  },
  {
    name: "--include-partial-messages",
    description: "Include partial message chunks",
  },
  {
    name: "--include-hook-events",
    description: "Include hook lifecycle events in stream-json output",
  },
  {
    name: "--replay-user-messages",
    description: "Re-emit user messages from stdin",
  },
  {
    name: "--max-budget-usd",
    description: "Maximum dollar amount to spend on API calls",
    args: { name: "amount" },
  },
  {
    name: "--file",
    description: "File resources to download at startup",
    args: { name: "file_id:relative_path", isVariadic: true },
  },
  {
    name: ["-n", "--name"],
    description: "Set a display name for this session",
    args: { name: "name" },
  },
  {
    name: ["-w", "--worktree"],
    description: "Create a new git worktree for this session",
    args: { name: "name", isOptional: true },
  },
  {
    name: "--tmux",
    description: "Create a tmux session for the worktree",
    args: { name: "mode", isOptional: true, suggestions: ["classic"] },
  },
  {
    name: ["--bg", "--background"],
    description: "Start the session as a background agent",
  },
  {
    name: "--remote-control",
    description: "Start an interactive session with Remote Control enabled",
    args: { name: "name", isOptional: true },
  },
  {
    name: "--remote-control-session-name-prefix",
    description: "Prefix for auto-generated Remote Control session names",
    args: { name: "prefix" },
  },
  {
    name: "--ide",
    description: "Automatically connect to IDE on startup",
  },
  {
    name: "--chrome",
    description: "Enable Claude in Chrome integration",
  },
  {
    name: "--no-chrome",
    description: "Disable Claude in Chrome integration",
  },
  {
    name: "--safe-mode",
    description: "Start with customizations disabled",
  },
  {
    name: "--bare",
    description: "Minimal mode",
  },
  {
    name: "--verbose",
    description: "Override verbose mode setting from config",
  },
  {
    name: ["-d", "--debug"],
    description: "Enable debug mode",
    args: { name: "filter", isOptional: true },
  },
  {
    name: "--debug-file",
    description: "Write debug logs to a file",
    args: { name: "path", template: "filepaths" },
  },
  {
    name: ["-h", "--help"],
    description: "Display help",
  },
  {
    name: ["-v", "--version"],
    description: "Output the version number",
  },
];

const spec: Fig.Spec = {
  name: "claude",
  description: "Claude Code CLI",
  icon,
  args: { name: "prompt", isOptional: true },
  options: commonOptions,
  subcommands: [
    {
      name: "agents",
      description: "Manage background agents",
      icon,
      options: [
        ...commonOptions,
        {
          name: "--all",
          description: "With --json, include completed sessions",
        },
        {
          name: "--cwd",
          description: "Filter by working directory",
          args: { name: "path", template: "folders" },
        },
        { name: "--json", description: "Print active sessions as JSON" },
      ],
    },
    { name: "auth", description: "Manage authentication", icon },
    {
      name: "auto-mode",
      description: "Inspect auto mode classifier configuration",
      icon,
    },
    { name: "doctor", description: "Check Claude Code health", icon },
    {
      name: "gateway",
      description: "Run the enterprise auth/telemetry gateway",
      icon,
    },
    {
      name: "install",
      description: "Install Claude Code native build",
      icon,
      args: {
        name: "target",
        isOptional: true,
        suggestions: ["stable", "latest"],
      },
    },
    {
      name: "mcp",
      description: "Configure and manage MCP servers",
      icon,
    },
    {
      name: ["plugin", "plugins"],
      description: "Manage Claude Code plugins",
      icon,
    },
    {
      name: "project",
      description: "Manage Claude Code project state",
      icon,
    },
    {
      name: "setup-token",
      description: "Set up a long-lived authentication token",
      icon,
    },
    {
      name: "ultrareview",
      description: "Run a cloud-hosted multi-agent code review",
      icon,
      args: { name: "target", isOptional: true },
      options: commonOptions,
    },
    {
      name: ["update", "upgrade"],
      description: "Check for updates and install if available",
      icon,
    },
  ],
};

export default spec;
