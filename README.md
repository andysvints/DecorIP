# DecorIP

## Overview

Designed to help you quickly identify and understand public IP addresses. It decorates IP addresses with additional information such as country and ASN (Autonomous System Number) powered by [IPinfo](https://ipinfo.io).
This extension does not activate on internal IP addresses, making it particularly useful for reviewing logs and providing additional context about IP addresses. It supports both IPv4 and IPv6 addresses.

## Features

- **IP Decoration**: Automatically decorates public IP addresses in your code with country and ASN information.
![IP Decoration](https://raw.githubusercontent.com/andysvints/DecorIP/main/assets/VSCode-DecorIP-IPDecoration.png)

- **Hover Information**: Provides detailed information about the IP address, including continent, country, ASN, and a link to more details.
![Hover Info](https://raw.githubusercontent.com/andysvints/DecorIP/main/assets/VSCode-DecorIP-HoverText.png)

- **Icon Customization**: Choose an icon to display next to the IP address decoration.
![Icon Customization](https://raw.githubusercontent.com/andysvints/DecorIP/main/assets/VSCode-DecorIP-IPDecorationIcon.png)

- **Enable/Disable Decoration Text**: Control whether the decoration text is shown in the editor or only on hover.
![Decoration Text](https://raw.githubusercontent.com/andysvints/DecorIP/main/assets/VSCode-DecorIP-IPDecorationText.png)

- **Supports IPv4 & IPv6**: Identifies and decorates both IPv4 and IPv6 addresses.

## Settings

The extension provides several settings that allow you to customize its behavior:

### `DecorIP.showIcon`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Show the icon next to IP addresses.

### `DecorIP.icon`

- **Type**: `string`
- **Default**: `📍`
- **Description**: Icon to show next to IP addresses.

### `DecorIP.showDecorationText`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Show decoration text in the editor next to IP addresses.

## Usage

- Open any file in your project that contains IP addresses.
- The extension will automatically highlight public IP addresses and add decorations next to them.
- Hover over an IP address to see detailed information.

[Icons created by Freepik - Flaticon.](https://www.flaticon.com/free-icons)