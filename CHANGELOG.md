# Release history

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<details>
  <summary><strong>Guiding Principles</strong></summary>

- Changelogs are for humans, not machines.
- There should be an entry for every single version.
- The same types of changes should be grouped.
- Versions and sections should be linkable.
- The latest version comes first.
- The release date of each versions is displayed.
- Mention whether you follow Semantic Versioning.

</details>

<details>
  <summary><strong>Types of changes</strong></summary>

Changelog entries are classified using the following labels _(from [keep-a-changelog](http://keepachangelog.com/)_):

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

</details>

## [1.0.0] - 2018-12-10

**Changed**

- refactored completely
- support was removed for `exclude` and `excludeType`
- `options.noZero` was renamed to `options.omitZero`

## [0.4.1] - 2016-06-01

- adds support for excluding types or keys

## [0.4.0] - 2016-06-01

- Changes for removing empty properties inside an array.
- Merge pull request #4 from kakadiadarpan/master
- closes https://github.com/jonschlinkert/omit-empty/issues/3

## [0.3.6] - 2016-04-09

- make array value handling stricter

## [0.3.5] - 2016-04-09

- ensure empty arrays are omitted

## [0.3.4] - 2016-03-27

- ensure zero-length function values aren't omitted

## [0.3.3] - 2016-03-19

- bugfix: do not omit Date objects.
- Merge pull request #2 from stnever/do-not-omit-dates

## [0.3.2] - 2015-12-24

- update deps

## [0.3.1] - 2015-03-24

- first commit

[Unreleased]: https://github.com/jonschlinkert/omit-empty/compare/0.4.1...1.0.0
[0.4.1]: https://github.com/jonschlinkert/omit-empty/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/jonschlinkert/omit-empty/compare/0.3.6...0.4.0
[0.3.6]: https://github.com/jonschlinkert/omit-empty/compare/0.3.5...0.3.6
[0.3.5]: https://github.com/jonschlinkert/omit-empty/compare/0.3.4...0.3.5
[0.3.4]: https://github.com/jonschlinkert/omit-empty/compare/0.3.3...0.3.4
[0.3.3]: https://github.com/jonschlinkert/omit-empty/compare/0.3.2...0.3.3
[0.3.2]: https://github.com/jonschlinkert/omit-empty/compare/0.3.1...0.3.2

[Unreleased]: https://github.com/jonschlinkert/omit-empty/compare/0.3.1...HEAD
[keep-a-changelog]: https://github.com/olivierlacan/keep-a-changelog

