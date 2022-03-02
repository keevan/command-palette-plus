<h1 align="center">
    📦 command-palette-plus
</h1>
<p align="center">Quickly open any installed plugin settings, docs and more!</p>
<p align="center">It <ins>should be simple</ins>. If you manage multiple packages, this will save you many bookmarks!</p>
<p align="center">
    <img alt="APM" src="https://img.shields.io/apm/v/command-palette-plus">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/keevan/command-palette-plus/ci">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/keevan/command-palette-plus">
    <img alt="APM" src="https://img.shields.io/apm/dm/command-palette-plus">
    <img alt="GitHub" src="https://img.shields.io/github/license/keevan/command-palette-plus">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/keevan/command-palette-plus">
</p>

<p align="center">
    Stay Tuned
</p>

### Quick Start

#### CLI:
```
apm install command-palette-plus
```
Or search for the `command-palette-plus` package via `Settings > Packages`. Read more on [Atom Packages](https://flight-manual.atom.io/using-atom/sections/atom-packages/).

### Features

- _Quickly_ open your plugin settings
- _Quickly_ open your `.cson` settings at the relevant plugin section
- _Quickly_ open the plugin README

With the `git-link` package, you should see more options to:
- _Quickly_ open and view outstanding issues for the plugin on GitHub.com
- _Quickly_ create a new issue for the plugin on GitHub.com
- _Quickly_ open the plugin on GitHub.com to perform any other actions
- More conveniently install plugins by name / command or GitHub repo (__[#warning](#warning)__)

Currently developing an Atom plugin?
- _Quickly_ do the above, without needing to search for the package first!
- In fact, this plugin keeps a list of your recently visited plugins so you can quickly jump to them
- Good thing most plugins have proper names, which means you can use __numbers__ to select the one you want

#### Warning (using this feature to install other plugins)
As with all nice things, please ensure that you have read and reviewed the plugin you plan to install before using this feature. By nature of convenience this is unsafe to do blindly and should be avoided. But _it is_ quite convenient isn't it :wink:.


### Command list
No keymaps are currently set by default.

I recommended you configure your own keybindings and use what is comfortable for you. You can do this by going to `Settings > Keybindings` or open it from the Command Pallete using `Application: Open Your Keymap`.

Hotkeys       | Command List               | Description
--------------|----------------------------|-------------
`ctrl+k`      | `command-palette-plus:search-mode`  | Opens a command pallete in searching mode.
`ctrl+shift+K`| `command-palette-plus:command-mode` | Opens a command pallete with command mode.

Note: For Mac, `ctrl` is replaced with `Command`


### Contributing
Please take a look at our [contributing guidelines](./.github/CONTRIBUTING.md) if you're interested in helping out!

##### Pending features
- Allow renaming of commands (because some people just don't like the default command names + makes it easier to search for if customised / aliased)
- Have a way to deduplicate command names e.g. if multiple packages so happen to use the same label (display the package its for? Scope level application? Should it even matter?)
- Allow other packages, to customise and add additional commands to the pallete.
- Update command pallete to work with install commands e.g. copied from a readme or similar. This will allow you to quickly confirm, and jump to the plugin page. There should be an option to SKIP this and directly install plugins this way, BUT it should be off by default, at least based on the recommendations (https://flight-manual.atom.io/hacking-atom/sections/handling-uris/) - URI should at most only ever show package page, apm pasting should always install since it is a confirmation but option is still nice.
- Would be good to work on git submodules as well to a certain extent, as the structure is similar, and usually are extensions / plugins added to a main project.
- Please raise an issue if you have a suggestion!

### Support

If you like or found this project helpful, please leave a star and consider supporting it for further development.

<a href="https://liberapay.com/kevinpham/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg" style="height: 40px; padding-right: 10px">
<a href="https://www.buymeacoffee.com/keevan" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important" ></a>
<a href="https://ko-fi.com/H2H3AFFHJ" target='_blank'><img height='36' style='border:0px;height:40px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

### License

<img alt="GitHub" src="https://img.shields.io/github/license/keevan/command-palette-plus?label=License">
