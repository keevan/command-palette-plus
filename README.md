<h1 align="center">
    📦 open-plugin
</h1>
<p align="center">Quickly open any installed plugin settings, docs and more!</p>
<p align="center">It <ins>should be simple</ins>. If you manage multiple packages, this will save you many bookmarks!</p>
<p align="center">
    <img alt="APM" src="https://img.shields.io/apm/v/open-plugin">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/keevan/open-plugin/ci">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/keevan/open-plugin">
    <img alt="APM" src="https://img.shields.io/apm/dm/open-plugin">
    <img alt="GitHub" src="https://img.shields.io/github/license/keevan/open-plugin">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/keevan/open-plugin">
</p>

<p align="center">
    Stay Tuned
</p>

### Quick Start

#### CLI:
```
apm install open-plugin
```
Or search for the `open-plugin` package via `Settings > Packages`. Read more on [Atom Packages](https://flight-manual.atom.io/using-atom/sections/atom-packages/).

### Features

Without going through a __slow user interface__:
- _Quickly_ open your plugin settings
- _Quickly_ open your `.cson` settings at the relevant plugin section
- _Quickly_ open plugin README
- _Quickly_ see outstanding issues for the plugin on GitHub.com
- _Quickly_ create a new issue for the plugin on GitHub.com
- _Quickly_ open the plugin on GitHub.com to perform any other actions
- _Quickly_ install plugins by name / command or GitHub repo (__[#warning](#warning)__)

Currently developing an Atom plugin?
- _Quickly_ do the above, without needing to search for the package first!
- In fact, this plugin keeps a list of your recently visited plugins so you can quickly jump to them
- Good thing most plugins have proper names, which means you can use __numbers__ to select the one you want

#### Warning (using this feature to install other plugins)
As with all nice things, please ensure that you have read and reviewed the plugin you plan to install before using this feature. By nature of convenience this is unsafe to do blindly and should be avoided. But _it is_ quite convenient isn't it :wink:.


### Command list
No keymaps are currently set by default.

I recommended you configure your own keybindings and use what is comfortable for you. You can do this by going to `Settings > Keybindings` or open it from the Command Pallete using `Application: Open Your Keymap`.

Command List                            | Description
----------------------------------------|-------------
`open-plugin:settings`                  | Opens a fuzzy finder to filter down installed plugins / packages


### Contributing
Please take a look at our [contributing guidelines](./.github/CONTRIBUTING.md) if you're interested in helping out!

##### Pending features
- Please raise an issue if you have a suggestion!

### Support

If you like this project or found it helpful, please consider supporting it for further development.

<a href="https://liberapay.com/kevinpham/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg" style="height: 40px; padding-right: 10px">
<a href="https://www.buymeacoffee.com/keevan" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important" ></a>
<a href="https://ko-fi.com/H2H3AFFHJ" target='_blank'><img height='36' style='border:0px;height:40px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

### License

<img alt="GitHub" src="https://img.shields.io/github/license/keevan/open-plugin?label=License">
