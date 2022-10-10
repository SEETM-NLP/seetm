# SEETM Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/) starting with version 0.0.1a1


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