# SEETM Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/) starting with version 0.0.1a1


## [1.1.0] - 2022-10-11
### Improvements
- implemented seetm evaluator for vector level ipa evaluation
- extended seetm evaluator for vector level rule based evaluation

### Bugfixes
- fixed a bug where `token-to-token mapper` failed to replace full length tokens due to regex errors 
- fixed a bug in `seetm tokenizer` where mapped tokens were not logged to the console


## [1.0.2] - 2022-10-11
### Improvements
- changed SEETM tokenizer persist file extension to `txt` from `json` due to a change in the tokenizer

### Bugfixes
- fixed a bug in `token-to-token mapper` (added sorting by decending order of token length and allowed only full token mappings). The bug caused shorted patterns to be replaced upfront, discarding longer patterns and also wrongly mapped partial tokens before the fix.


## [1.0.1] - 2022-10-10
### Bugfixes
- fixed a bug where package requirements and readme was not read properly


## [1.0.0] - 2022-10-10
### Improvements
- tested python packages and installation via PyPI and TestPyPI

### Bugfixes
- removed unnecessary backend modules


## [0.0.1a1] - 2022-08-28
### Features
- added the main `CLI`
- added the `SEETM server GUI`
- CLI supports extracting `token maps` based on the training dataset of rasa via `SEETM extract`
- supports evaluating the IPA-based mappings using a separate evaluation dataset via `SEETM evaluate`
- SEETM parameters can be pre-configured via `seetm_config.yml`