import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";

export default function Dashboard() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <ScrollView
      className="p-4 bg-background"
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Title */}
      <Text className="text-foreground text-2xl font-bold mb-6">
        Design Token Showcase
      </Text>

      {/* Foreground Text */}
      <Text className="text-foreground text-lg font-bold mb-4">
        Foreground Text
      </Text>

      {/* Card */}
      <View className="bg-secondary p-20 rounded-lg mb-4 shadow">
        <Text className="text-secondary-foreground text-center">
          This is a card
        </Text>
      </View>

      {/* Popover */}
      <View className="bg-popover p-4 rounded-lg mb-4">
        <Text className="text-popover-foreground">Popover content</Text>
      </View>

      {/* Buttons with Hover Effects */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity className="bg-primary p-3 rounded-lg hover:bg-primary-foreground">
          <Text className="text-primary-foreground hover:text-primary font-semibold">
            Primary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-secondary p-3 rounded-lg hover:bg-secondary-foreground">
          <Text className="text-secondary-foreground hover:text-secondary font-semibold">
            Secondary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-destructive p-3 rounded-lg hover:bg-destructive-foreground">
          <Text className="text-destructive-foreground hover:text-destructive font-semibold">
            Destructive
          </Text>
        </TouchableOpacity>
      </View>

      {/* Switch */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-foreground">Enable Feature</Text>
        <Switch
          trackColor={{
            false: "rgb(var(--muted))",
            true: "rgb(var(--primary))",
          }}
          thumbColor={
            isEnabled
              ? "rgb(var(--primary-foreground))"
              : "rgb(var(--secondary))"
          }
          ios_backgroundColor="rgb(var(--input))"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Dropdown */}
      <View className="relative mb-4">
        <TouchableOpacity
          className="bg-muted p-3 rounded-lg border border-border"
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text className="text-muted-foreground">Select an Option</Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View className="absolute top-full left-0 right-0 bg-card shadow rounded-lg border border-border mt-2 z-10">
            <TouchableOpacity className="p-3 hover:bg-popover">
              <Text className="text-foreground">Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-3 hover:bg-popover">
              <Text className="text-foreground">Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-3 hover:bg-popover">
              <Text className="text-foreground">Option 3</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Input */}
      <View className="bg-input p-4 rounded-lg mb-4">
        <TextInput
          className="text-foreground placeholder:text-muted-foreground"
          placeholder="Input background"
        />
      </View>

      {/* Border Example */}
      <View className="border border-border p-4 rounded-lg mb-4">
        <Text className="text-foreground">Box with Border</Text>
      </View>

      {/* Accent */}
      <View className="bg-accent p-4 rounded-lg mb-4">
        <Text className="text-accent-foreground">Accent Background</Text>
      </View>

      {/* Ring Effect */}
      <TouchableOpacity className="bg-primary p-3 rounded-lg ring-2 ring-ring mb-4">
        <Text className="text-primary-foreground font-semibold">
          Ring Effect Button
        </Text>
      </TouchableOpacity>

      {/* Rounded Corners */}
      <View className="bg-muted p-4 rounded mb-4">
        <Text className="text-muted-foreground">Rounded Corner Example</Text>
      </View>
    </ScrollView>
  );
}
