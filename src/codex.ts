const icon =
  "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/openai.png";

const configOptions: Fig.Option[] = [
  {
    name: ["-c", "--config"],
    description: "Override a configuration value from config.toml",
    args: { name: "key=value" },
  },
  {
    name: "--enable",
    description: "Enable a feature",
    args: { name: "feature" },
  },
  {
    name: "--disable",
    description: "Disable a feature",
    args: { name: "feature" },
  },
];

const sessionOptions: Fig.Option[] = [
  ...configOptions,
  {
    name: "--strict-config",
    description: "Error out when config.toml contains unrecognized fields",
  },
  {
    name: ["-i", "--image"],
    description: "Attach image(s) to the initial prompt",
    args: { name: "file", template: "filepaths", isVariadic: true },
  },
  {
    name: ["-m", "--model"],
    description: "Model the agent should use",
    args: { name: "model" },
  },
  {
    name: "--oss",
    description: "Use open-source provider",
  },
  {
    name: "--local-provider",
    description: "Specify which local provider to use",
    args: { name: "provider", suggestions: ["lmstudio", "ollama"] },
  },
  {
    name: ["-p", "--profile"],
    description: "Layer a named config profile on top of the base config",
    args: { name: "profile" },
  },
  {
    name: ["-s", "--sandbox"],
    description: "Select the sandbox policy",
    args: {
      name: "mode",
      suggestions: ["read-only", "workspace-write", "danger-full-access"],
    },
  },
  {
    name: "--dangerously-bypass-approvals-and-sandbox",
    description: "Skip all confirmation prompts and execute without sandboxing",
  },
  {
    name: "--dangerously-bypass-hook-trust",
    description: "Run enabled hooks without persisted hook trust",
  },
  {
    name: ["-C", "--cd"],
    description: "Use the specified directory as the working root",
    args: { name: "dir", template: "folders" },
  },
  {
    name: "--add-dir",
    description: "Additional writable directory",
    args: { name: "dir", template: "folders" },
  },
];

const interactiveOptions: Fig.Option[] = [
  ...sessionOptions,
  {
    name: "--remote",
    description: "Connect the TUI to a remote app server endpoint",
    args: { name: "addr" },
  },
  {
    name: "--remote-auth-token-env",
    description: "Environment variable containing the remote bearer token",
    args: { name: "env_var" },
  },
  {
    name: ["-a", "--ask-for-approval"],
    description: "Configure when approval is required",
    args: {
      name: "policy",
      suggestions: ["untrusted", "on-failure", "on-request", "never"],
    },
  },
  {
    name: "--search",
    description: "Enable live web search",
  },
  {
    name: "--no-alt-screen",
    description: "Disable alternate screen mode",
  },
  {
    name: ["-h", "--help"],
    description: "Print help",
  },
  {
    name: ["-V", "--version"],
    description: "Print version",
  },
];

const execOptions: Fig.Option[] = [
  ...sessionOptions,
  {
    name: "--skip-git-repo-check",
    description: "Allow running Codex outside a Git repository",
  },
  {
    name: "--ephemeral",
    description: "Run without persisting session files to disk",
  },
  {
    name: "--ignore-user-config",
    description: "Do not load CODEX_HOME/config.toml",
  },
  {
    name: "--ignore-rules",
    description: "Do not load user or project execpolicy rules files",
  },
  {
    name: "--output-schema",
    description: "JSON Schema file describing the final response shape",
    args: { name: "file", template: "filepaths" },
  },
  {
    name: "--color",
    description: "Color output mode",
    args: { name: "mode", suggestions: ["always", "never", "auto"] },
  },
  {
    name: "--json",
    description: "Print events to stdout as JSONL",
  },
  {
    name: ["-o", "--output-last-message"],
    description: "Write the last agent message to a file",
    args: { name: "file", template: "filepaths" },
  },
  {
    name: ["-h", "--help"],
    description: "Print help",
  },
  {
    name: ["-V", "--version"],
    description: "Print version",
  },
];

const spec: Fig.Spec = {
  name: "codex",
  description: "OpenAI Codex CLI",
  icon,
  args: {
    name: "prompt",
    isOptional: true,
    isCommand: false,
  },
  options: interactiveOptions,
  subcommands: [
    {
      name: ["exec", "e"],
      description: "Run Codex non-interactively",
      icon,
      args: { name: "prompt", isOptional: true },
      options: execOptions,
      subcommands: [
        { name: "resume", description: "Resume a previous session" },
        { name: "review", description: "Run a code review" },
        { name: "help", description: "Print help for a subcommand" },
      ],
    },
    {
      name: "review",
      description: "Run a code review non-interactively",
      icon,
      options: execOptions,
    },
    {
      name: "login",
      description: "Manage login",
      icon,
      options: configOptions,
    },
    {
      name: "logout",
      description: "Remove stored authentication credentials",
      icon,
      options: configOptions,
    },
    {
      name: "mcp",
      description: "Manage external MCP servers for Codex",
      icon,
      options: configOptions,
      subcommands: [
        { name: "list" },
        { name: "get" },
        { name: "add" },
        { name: "remove" },
        { name: "login" },
        { name: "logout" },
        { name: "help", description: "Print help for a subcommand" },
      ],
    },
    {
      name: "plugin",
      description: "Manage Codex plugins",
      icon,
      options: configOptions,
      subcommands: [
        {
          name: "add",
          description:
            "Install a plugin from a configured marketplace snapshot",
        },
        {
          name: "list",
          description: "List plugins available from configured marketplaces",
        },
        {
          name: "marketplace",
          description: "Manage configured plugin marketplaces",
        },
        {
          name: "remove",
          description: "Remove an installed plugin from local config and cache",
        },
        { name: "help", description: "Print help for a subcommand" },
      ],
    },
    {
      name: "mcp-server",
      description: "Start Codex as an MCP server",
      icon,
      options: configOptions,
    },
    {
      name: "app-server",
      description: "Run the app server or related tooling",
      icon,
      options: configOptions,
    },
    {
      name: "remote-control",
      description: "Manage the app-server daemon with remote control enabled",
      icon,
      options: configOptions,
    },
    {
      name: "app",
      description: "Launch the Codex desktop app",
      icon,
      options: configOptions,
    },
    {
      name: "completion",
      description: "Generate shell completion scripts",
      icon,
      args: {
        name: "shell",
        isOptional: true,
        suggestions: ["bash", "zsh", "fish", "powershell", "elvish"],
      },
      options: configOptions,
    },
    {
      name: "update",
      description: "Update Codex to the latest version",
      icon,
      options: configOptions,
    },
    {
      name: "doctor",
      description:
        "Diagnose Codex installation, config, auth, and runtime health",
      icon,
      options: configOptions,
    },
    {
      name: "sandbox",
      description: "Run commands within a Codex-provided sandbox",
      icon,
      args: { name: "command", isCommand: true, isOptional: true },
      options: configOptions,
    },
    {
      name: "debug",
      description: "Debugging tools",
      icon,
      options: configOptions,
    },
    {
      name: ["apply", "a"],
      description: "Apply the latest diff produced by Codex agent",
      icon,
      options: configOptions,
    },
    {
      name: "resume",
      description: "Resume a previous interactive session",
      icon,
      args: { name: "session", isOptional: true },
      options: [
        ...configOptions,
        { name: "--last", description: "Continue the most recent session" },
      ],
    },
    {
      name: "archive",
      description: "Archive a saved session by id or session name",
      icon,
      args: { name: "session", isOptional: true },
      options: configOptions,
    },
    {
      name: "delete",
      description: "Permanently delete a saved session by id or session name",
      icon,
      args: { name: "session", isOptional: true },
      options: configOptions,
    },
    {
      name: "unarchive",
      description: "Unarchive a saved session by id or session name",
      icon,
      args: { name: "session", isOptional: true },
      options: configOptions,
    },
    {
      name: "fork",
      description: "Fork a previous interactive session",
      icon,
      args: { name: "session", isOptional: true },
      options: [
        ...configOptions,
        { name: "--last", description: "Fork the most recent session" },
      ],
    },
    {
      name: "cloud",
      description: "Browse Codex Cloud tasks and apply changes locally",
      icon,
      options: configOptions,
    },
    {
      name: "exec-server",
      description: "Run the standalone exec-server service",
      icon,
      options: configOptions,
    },
    {
      name: "features",
      description: "Inspect feature flags",
      icon,
      options: configOptions,
    },
    {
      name: "help",
      description: "Print help for a subcommand",
      icon,
    },
  ],
};

export default spec;
