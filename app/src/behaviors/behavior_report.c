
#define DT_DRV_COMPAT zmk_behavior_report

#include <zephyr/logging/log.h>

#include <drivers/character_map.h>
#include <drivers/behavior.h>
#include <zephyr/device.h>
#include <zephyr/devicetree.h>
#include <zmk/behavior.h>
#include <zmk/send_string.h>
#include <zmk/battery.h>
#include <zmk/wpm.h>
#include <zmk/split/bluetooth/central.h>
#include <zmk/ble.h>
#include <zmk/keymap.h>
#include <zmk/endpoints_types.h>
#include <zmk/endpoints.h>

LOG_MODULE_DECLARE(zmk, CONFIG_ZMK_LOG_LEVEL);

struct behavior_report_config {
    int type;
};

static void report_battery(const struct zmk_behavior_binding_event *event) {
    char string[80];
    // ZMK_SPLIT_BLE_PERIPHERAL_COUNT
    uint8_t right_battery_level = 0;
#if IS_ENABLED(CONFIG_ZMK_SPLIT_BLE_CENTRAL_BATTERY_LEVEL_FETCHING)
    zmk_split_get_peripheral_battery_level(0, &right_battery_level);
#endif // IS_ENABLED(CONFIG_ZMK_SPLIT_BLE_CENTRAL_BATTERY_LEVEL_FETCHING)
    uint8_t index = zmk_keymap_highest_layer_active();
    const char *label = zmk_keymap_layer_name(index);
    snprintf(string, sizeof(string), "Battery: [left: %u%%, right: %u%%] ",
             zmk_battery_state_of_charge(), right_battery_level);
    zmk_send_string(&ZMK_SEND_STRING_CONFIG_DEFAULT, event, string);
}

struct output_status_state {
    struct zmk_endpoint_instance selected_endpoint;
    bool active_profile_connected;
    bool active_profile_bonded;
};

static struct output_status_state get_state() {
    return (struct output_status_state){.selected_endpoint = zmk_endpoints_selected(),
                                        .active_profile_connected =
                                            zmk_ble_active_profile_is_connected(),
                                        .active_profile_bonded = !zmk_ble_active_profile_is_open()};
    ;
}

#define SYMBOL_USB "usb"            // "" /*62087, 0xF287*/
#define SYMBOL_BLE "ble"            // ""
#define SYMBOL_OK "ok"              // ""       /*61452, 0xF00C*/
#define SYMBOL_CLOSE "disconnected" // ""    /*61453, 0xF00D*/
#define SYMBOL_SETTINGS "unbounded" // "" /*61459, 0xF013*/

static void report_selected_endpoint(const struct zmk_behavior_binding_event *event) {
    struct output_status_state state = get_state();
    char text[32];

    switch (state.selected_endpoint.transport) {
    case ZMK_TRANSPORT_USB:
        snprintf(text, sizeof(text), "endpoint: " SYMBOL_USB);
        break;
    case ZMK_TRANSPORT_BLE:
        if (state.active_profile_bonded) {
            if (state.active_profile_connected) {
                snprintf(text, sizeof(text), "endpoint: " SYMBOL_BLE " %i " SYMBOL_OK,
                         state.selected_endpoint.ble.profile_index + 1);
            } else {
                snprintf(text, sizeof(text), "endpoint: " SYMBOL_BLE " %i " SYMBOL_CLOSE,
                         state.selected_endpoint.ble.profile_index + 1);
            }
        } else {
            snprintf(text, sizeof(text), "endpoint: " SYMBOL_BLE " %i " SYMBOL_SETTINGS,
                     state.selected_endpoint.ble.profile_index + 1);
        }
        break;
    }
    zmk_send_string(&ZMK_SEND_STRING_CONFIG_DEFAULT, event, text);
}

static int behavior_report_init(const struct device *dev) { return 0; };

static int on_keymap_binding_pressed(struct zmk_behavior_binding *binding,
                                     struct zmk_behavior_binding_event event) {
    const struct device *dev = zmk_behavior_get_binding(binding->behavior_dev);
    const struct behavior_report_config *cfg = dev->config;
    // ZMK_BUILD_ASSERT_CHARACTER_MAP_CHOSEN();
    report_battery(&event);
    report_selected_endpoint(&event);

    return ZMK_BEHAVIOR_OPAQUE;
}

static const struct behavior_driver_api behavior_report_driver_api = {
    .binding_pressed = on_keymap_binding_pressed,
    .locality = BEHAVIOR_LOCALITY_CENTRAL,
#if IS_ENABLED(CONFIG_ZMK_BEHAVIOR_METADATA)
    .get_parameter_metadata = zmk_behavior_get_empty_param_metadata,
#endif // IS_ENABLED(CONFIG_ZMK_BEHAVIOR_METADATA)
};

#define RPT_INST(n)                                                                                \
    static const struct behavior_report_config behavior_report_config_##n = {                      \
        .type = DT_INST_PROP(n, type)};                                                            \
    BEHAVIOR_DT_INST_DEFINE(n, behavior_report_init, NULL, NULL, &behavior_report_config_##n,      \
                            APPLICATION, CONFIG_KERNEL_INIT_PRIORITY_DEFAULT,                      \
                            &behavior_report_driver_api);

DT_INST_FOREACH_STATUS_OKAY(RPT_INST)
