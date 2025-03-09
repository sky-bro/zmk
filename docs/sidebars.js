module.exports = {
  docs: [
    {
      type: "category",
      label: "Getting Started",
      link: {
        type: "doc",
        id: "intro",
      },
      collapsed: false,
      items: [
        "hardware",
        "faq",
        "user-setup",
        "customization",
        {
          type: "category",
          label: "Troubleshooting",
          link: {
            type: "doc",
            id: "troubleshooting/index",
          },
          collapsed: true,
          items: [
            "troubleshooting/building-issues",
            "troubleshooting/flashing-issues",
            "troubleshooting/connection-issues",
            "troubleshooting/hardware-issues",
          ],
        },
      ],
    },
    {
      Features: [
        "features/bluetooth",
        "features/modules",
        "features/split-keyboards",
        "features/debouncing",
        "features/battery",
        "features/low-power-states",
        "features/encoders",
        "features/pointing",
        "features/displays",
        "features/lighting",
        "features/studio",
      ],
    },
    {
      type: "category",
      label: "Keymaps",
      link: {
        type: "doc",
        id: "keymaps/index",
      },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Behaviors",
          link: {
            type: "doc",
            id: "keymaps/behaviors/index",
          },
          collapsed: true,
          items: [
            "keymaps/behaviors/key-press",
            "keymaps/behaviors/layers",
            "keymaps/behaviors/misc",
            "keymaps/behaviors/hold-tap",
            "keymaps/behaviors/mod-tap",
            "keymaps/behaviors/mod-morph",
            "keymaps/behaviors/macros",
            "keymaps/behaviors/send-string",
            "keymaps/behaviors/key-toggle",
            "keymaps/behaviors/sticky-key",
            "keymaps/behaviors/sticky-layer",
            "keymaps/behaviors/tap-dance",
            "keymaps/behaviors/caps-word",
            "keymaps/behaviors/key-repeat",
            "keymaps/behaviors/sensor-rotate",
            "keymaps/behaviors/mouse-emulation",
            "keymaps/behaviors/reset",
            "keymaps/behaviors/bluetooth",
            "keymaps/behaviors/outputs",
            "keymaps/behaviors/underglow",
            "keymaps/behaviors/backlight",
            "keymaps/behaviors/power",
            "keymaps/behaviors/soft-off",
            "keymaps/behaviors/studio-unlock",
          ],
        },
        "keymaps/modifiers",
        "keymaps/combos",
        "keymaps/conditional-layers",
        "keymaps/list-of-keycodes",
        {
          type: "category",
          label: "Input Processors",
          link: {
            type: "doc",
            id: "keymaps/input-processors/index",
          },
          collapsed: true,
          items: [
            "keymaps/input-processors/usage",
            "keymaps/input-processors/scaler",
            "keymaps/input-processors/transformer",
            "keymaps/input-processors/code-mapper",
            "keymaps/input-processors/temp-layer",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Configuration",
      link: {
        type: "doc",
        id: "config/index",
      },
      collapsed: true,
      items: [
        "config/battery",
        "config/behaviors",
        "config/bluetooth",
        "config/combos",
        "config/displays",
        "config/encoders",
        "config/lighting",
        "config/pointing",
        "config/keymap",
        "config/layout",
        "config/kscan",
        "config/power",
        "config/system",
        "config/studio",
      ],
    },
    {
      Development: [
        {
          type: "category",
          label: "Hardware Integration",
          link: {
            type: "doc",
            id: "development/hardware-integration/index",
          },
          collapsed: true,
          items: [
            "development/hardware-integration/new-shield",
            "development/hardware-integration/physical-layouts",
            "development/hardware-integration/hardware-metadata-files",
            "development/hardware-integration/pinctrl",
            "development/hardware-integration/dongle",
            "development/hardware-integration/shift-registers",
            "development/hardware-integration/encoders",
            "development/hardware-integration/soft-off-setup",
            "development/hardware-integration/pointing",
            "development/hardware-integration/battery",
            {
              type: "category",
              label: "Lighting",
              link: {
                type: "doc",
                id: "development/hardware-integration/lighting/index",
              },
              collapsed: true,
              items: [
                "development/hardware-integration/lighting/underglow",
                "development/hardware-integration/lighting/backlight",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Contributing",
          collapsed: true,
          items: [
            "development/contributing/clean-room",
            "development/contributing/pull-requests",
            "development/contributing/documentation",
          ],
        },
        {
          type: "category",
          label: "Local Toolchain",
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Setup",
              link: {
                type: "doc",
                id: "development/local-toolchain/setup/index",
              },
              collapsed: true,
              items: [
                "development/local-toolchain/setup/container",
                "development/local-toolchain/setup/native",
              ],
            },
            "development/local-toolchain/build-flash",
            "development/local-toolchain/pre-commit",
            "development/local-toolchain/ide-integration",
            "development/local-toolchain/tests",
            "development/local-toolchain/posix-board",
          ],
        },
        "development/module-creation",
        "development/usb-logging",
        "development/studio-rpc-protocol",
        "development/new-behavior",
      ],
    },
  ],
};
