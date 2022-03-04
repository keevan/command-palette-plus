<h1 align="center">
    command-palette-plus
</h1>
<p align="center">An opinionated palette inspired by GitHub's command palette - show less, do more!</p>
<p align="center"><b>Note: this package is still quite unstable and not ready for daily use - some quirks expected</b></p>
<p align="center">
    <img alt="APM" src="https://img.shields.io/apm/v/command-palette-plus">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/keevan/command-palette-plus/ci">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/keevan/command-palette-plus">
    <img alt="APM" src="https://img.shields.io/apm/dm/command-palette-plus">
    <img alt="GitHub" src="https://img.shields.io/github/license/keevan/command-palette-plus">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/keevan/command-palette-plus">
</p>

<p align="center">
    <img src="https://user-images.githubusercontent.com/9924643/156354053-08ee3867-e284-4771-a0f5-7698bf91bbda.png" />
</p>

### Quick Start

#### CLI:
```
apm install command-palette-plus
```
Or search for the `command-palette-plus` package via `Settings > Packages`. Read more on [Atom Packages](https://flight-manual.atom.io/using-atom/sections/atom-packages/).

### Features

- Scoping, which means more relevant commands depending on the situation, which will give the users better options when they need them
- A nicer palette experience in my opinion, inspired the one on GitHub's website
- A way to extend the list of commands returned, ordered by default by the order defined per package.
- Hopefully flexible enough people can extend the functionality in their packages

A few examples sprinkled with a little bias:

- `git-link`: Will display links to pages if you are in a git repository. Common pages like Issues, Pull Requests, and one for the repository are also available. Planned support to copy links directly from the command palette upon selection by triggering additional hotkeys.
- `open-plugin`: Will provide options to jump to the package settings, or config.cson at the relevant line. Planned support to also open different packages quickly without needing to configure it in package-manager first.

### Command list
No keymaps are currently set by default.

I recommended you configure your own keybindings and use what is comfortable for you. You can do this by going to `Settings > Keybindings` or open it from the Command Pallete using `Application: Open Your Keymap`.

Hotkeys       | Command List               | Description
--------------|----------------------------|-------------
`ctrl+k`      | `command-palette-plus:search-mode`  | Opens the pallete in search mode.
`ctrl+shift+K`| `command-palette-plus:command-mode` | Opens the pallete in command mode.

Note: For Mac, `ctrl` can be replaced with `Command`

### Why not fork `atom/command-palette`?

Good question. Short answer is, well, because I wanted to create something myself that also helps me jump between locations of interest, do more things and also because I wanted to see if I can create packages using React.

This decision was further reinforced for the following reasons:
- **Unmaintained:** Atom's command-palette repo is somewhat unmaintained. There are a couple of nice PRs that just haven't been merged through, and I feel like some of those features could have been added as packages. PRs that just sit there with no response from maintainers can be quite upsetting. (See [command-palette#102](https://github.com/atom/command-palette/pull/102) as an example)
- **Extensibility**: I hope to make this _chaotically_ extendible, if not a bit easier for contributions to flow through for.
- **Stability**: The current command palette Atom has, well, just works. It's pretty stable. This implementation stemed as a hobby expiriment.
- **React vs. Etch**: The original command palette was built on top of an Etch component, which might have its benefits and probably powers a lot of the UI in Atom. But unlike Etch, React is probably more known in the community, has been embraced by many people and so can be extended more.

### How To

Coming Soon

### References

Coming Soon


### Contributing
Please take a look at our [contributing guidelines](./.github/CONTRIBUTING.md) if you're interested in helping out!

##### Pending features
- Populate existing commands in the suggestions list via a "command-mode" or "command" scope.
- Allow re-labeling of commands (because sometimes it's easier with an alias) - or perhaps allow alias to be part of the filter criterion.
- Allow other packages, to customise and add additional commands to the pallete.
- Update command pallete to work with install commands e.g. copied from a readme or similar. This will allow you to quickly confirm, and jump to the plugin page. There should be an option to SKIP this and directly install plugins this way, BUT it should be off by default, at least based on the recommendations (https://flight-manual.atom.io/hacking-atom/sections/handling-uris/) - URI should at most only ever show package page, apm pasting should always install since it is a confirmation but option is still nice.
- Would be good to work on git submodules as well to a certain extent, as the structure is similar, and usually are extensions / plugins added to a main project.
- Allow a custom blocklist, to remove a command from a package that you may:
    - never use (declutters the shown commands)
    - has a duplicate label of another command from a different package you prefer the command behaviour for.
    - is malicious (in this event, you'd report the package to Atom.io)
- With the custom blocklist, it would be ideal if the user didn't need to worry about finding the command + package, pasting it in somewhere. No, I would think this would be better served and handled directly in the command-palette-plus UI. Like toggling an option you no longer want to see.
- Potentially a way of searching packages that extend the functionality of this package, and install them directly without needing to do tedious lookup. May require extra metadata and should be standard but flexible to allow for additional display options.
- Please raise an issue if you have a suggestion!

### Support

If you like or found this project helpful, please leave a star and consider supporting it for further development.

<a href="https://liberapay.com/kevinpham/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg" style="height: 40px; padding-right: 10px">
<a href="https://www.buymeacoffee.com/keevan" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important" ></a>
<a href="https://ko-fi.com/H2H3AFFHJ" target='_blank'><img height='36' style='border:0px;height:40px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

### License

<img alt="GitHub" src="https://img.shields.io/github/license/keevan/command-palette-plus?label=License">
