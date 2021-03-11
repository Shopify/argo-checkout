# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.8.3-alpha.2](https://github.com/Shopify/argo-admin/compare/v0.8.3-alpha.1...v0.8.3-alpha.2) (2021-03-11)

**Note:** Version bump only for package @shopify/argo-playground





## [0.8.3-alpha.1](https://github.com/Shopify/argo-admin/compare/v0.8.3-alpha.0...v0.8.3-alpha.1) (2021-01-29)

**Note:** Version bump only for package @shopify/argo-playground





## [0.8.3-alpha.0](https://github.com/Shopify/argo-admin/compare/v0.8.2...v0.8.3-alpha.0) (2021-01-21)


### Bug Fixes

* update remote-ui to prevent cache issue in worker file ([959a415](https://github.com/Shopify/argo-admin/commit/959a415b5515c121889164c2c19ef92f45fd0cc1))





## [0.8.2](https://github.com/Shopify/argo-admin/compare/v0.8.1...v0.8.2) (2020-12-11)

**Note:** Version bump only for package @shopify/argo-playground





## [0.8.1](https://github.com/Shopify/argo-admin/compare/v0.8.0...v0.8.1) (2020-12-11)

**Note:** Version bump only for package @shopify/argo-playground





# 0.8.0 (2020-12-08)


### Bug Fixes

* fix hotswap nested array object in remote-ui ([9be1bf6](https://github.com/Shopify/argo-admin/commit/9be1bf678a0f575150ab0d913223c452737e389f))
* fix remote-ui hotswap nested function ([76e31cd](https://github.com/Shopify/argo-admin/commit/76e31cd59db8a1609c876fd81ae2f79d4bbe8437))
* improve readme structure ([b42da3c](https://github.com/Shopify/argo-admin/commit/b42da3c1866f864559bc69176316602cc4c13a1b))
* update polaris and polaris icons ([4da7004](https://github.com/Shopify/argo-admin/commit/4da700468637e2a12b9f48c86f9599336b52869c))
* **app-chrome-container:** remove unnecessary conditional ([cd99192](https://github.com/Shopify/argo-admin/commit/cd99192b17fae7a72d16f6b84f25c1e3ca398c6d))
* **playground:** add style override for top-level cards ([719ef7f](https://github.com/Shopify/argo-admin/commit/719ef7fa52ca2cef94662175804230e990a186a7))
* **playground:** fix missing icon, polaris overrides ([a890eaf](https://github.com/Shopify/argo-admin/commit/a890eafb504e58e34bb4a32424d0241c03e1365a))
* **playground:** inject script after content ([d47b830](https://github.com/Shopify/argo-admin/commit/d47b830f9837585a6f2fe1472d9e00af7f7dc8ea))
* **playground:** main menu icons ([2b25be6](https://github.com/Shopify/argo-admin/commit/2b25be6d959f4a5c374920905cac7e42a38d49df))
* clean up webpack configs and package.json ([51becc4](https://github.com/Shopify/argo-admin/commit/51becc48730c30e18533f521eb969103003deedb))
* correct name SubscriptionManagement ([#496](https://github.com/Shopify/argo-admin/issues/496)) ([3577d00](https://github.com/Shopify/argo-admin/commit/3577d009f9a416c4636fdb1a7ebd29379020bc0b))
* fix locale extension api ([d00a519](https://github.com/Shopify/argo-admin/commit/d00a519f9ebd6b7e1a226a76a9b931a5170e7dc0))
* make links safe ([bac28f0](https://github.com/Shopify/argo-admin/commit/bac28f067f3861482adb872be2ba36cebdc8f4f8))
* re-add card action ([#602](https://github.com/Shopify/argo-admin/issues/602)) ([cdd6785](https://github.com/Shopify/argo-admin/commit/cdd6785c47417d4f6fe2e8e94bab64cb758a79b8))
* replace render error image ([#500](https://github.com/Shopify/argo-admin/issues/500)) ([dc87105](https://github.com/Shopify/argo-admin/commit/dc87105f9ee6352fffd13611bb3c42e0bd4a4f7e))
* reset independent versioning ([5e6761a](https://github.com/Shopify/argo-admin/commit/5e6761a0075b57538aacfc28f5437e647930a450))
* resource list onQueryClear reset the list items ([9209240](https://github.com/Shopify/argo-admin/commit/920924045cb94af2f81c3dc7b056883540e4a3f5))
* standardize form field naming ([5391b59](https://github.com/Shopify/argo-admin/commit/5391b598a9e6f516f2d4aff603d9aeee634d67e3))


### Features

* add component groups ([#514](https://github.com/Shopify/argo-admin/issues/514)) ([11fb50b](https://github.com/Shopify/argo-admin/commit/11fb50b0ad910d923405535d109a9f220a83d9e3))
* add extension point to api ([f30fd1c](https://github.com/Shopify/argo-admin/commit/f30fd1cef7adedd86e0025d5f3d397113f4e5f3a))
* add product data input ([305d464](https://github.com/Shopify/argo-admin/commit/305d464dff656ee4fc3f702f36601ddba309eeec))
* add render timeout hook and example playground ([#473](https://github.com/Shopify/argo-admin/issues/473)) ([5976199](https://github.com/Shopify/argo-admin/commit/5976199b669d95ce539a021dc484148ef1f0d1bf))
* add validation to select ([#521](https://github.com/Shopify/argo-admin/issues/521)) ([a13acd8](https://github.com/Shopify/argo-admin/commit/a13acd86c9545fe04a15f074ee79bf7b95dcd4de))
* added readyState no script ([#563](https://github.com/Shopify/argo-admin/issues/563)) ([afa23f7](https://github.com/Shopify/argo-admin/commit/afa23f7b8d604b7f0d4b9983d4be877e2e85e3e9))
* api consistency onclick to onpress ([6c68dd6](https://github.com/Shopify/argo-admin/commit/6c68dd6291cdaee34539c6a4357ba07f0190b075))
* data api ([#704](https://github.com/Shopify/argo-admin/issues/704)) ([ac25d95](https://github.com/Shopify/argo-admin/commit/ac25d951af5e048a83c81b78dfdb3c37a2b6b48a))
* enable displaying an error and loading state ([31d2a86](https://github.com/Shopify/argo-admin/commit/31d2a867a9248d5be4e1e98b8b4dee15031959a1))
* error unsupported component ([#902](https://github.com/Shopify/argo-admin/issues/902)) ([938363e](https://github.com/Shopify/argo-admin/commit/938363e561225cdf24693f6a7e012016d37d851f))
* extension point components ([#820](https://github.com/Shopify/argo-admin/issues/820)) ([9be8c61](https://github.com/Shopify/argo-admin/commit/9be8c61f7a567be8b1c2ec13156a5dd3422182d0))
* hot-swap api ([#1096](https://github.com/Shopify/argo-admin/issues/1096)) ([473597b](https://github.com/Shopify/argo-admin/commit/473597bbacc846f194431a44ebb9c90a27b181d6))
* radio and checkbox to use children not label ([e5c7705](https://github.com/Shopify/argo-admin/commit/e5c77051d6c3039aa40d912c699d049fa8d191a0))
* radio id and checked is optional ([9c3954e](https://github.com/Shopify/argo-admin/commit/9c3954e7852e0aa6d314a824c2e64dc68d967886))
* radio onchange gives value not id ([#914](https://github.com/Shopify/argo-admin/issues/914)) ([9202a9e](https://github.com/Shopify/argo-admin/commit/9202a9e16863153ceb686e5abdd604cee8b7841a))
* radiobutton ([0438e25](https://github.com/Shopify/argo-admin/commit/0438e25b15cdc504a03b2cdc28b9526e83ed2b15))
* remove extension point enum ([06479db](https://github.com/Shopify/argo-admin/commit/06479db477722dad8fa5625cbc99274a07916037))
* rename modal actions to container api ([50746d5](https://github.com/Shopify/argo-admin/commit/50746d52f7a46a87d6c51a6989fb93ebdec2953b))
* rename pressable to clickable ([e48be20](https://github.com/Shopify/argo-admin/commit/e48be20b3282f6299e225d4e7d937b2b0c70302a))
* rename radio button to radio ([5a15c0a](https://github.com/Shopify/argo-admin/commit/5a15c0a9ed25fb0b196252db059bd86601c72263))
* rename subscription management ([#973](https://github.com/Shopify/argo-admin/issues/973)) ([5752089](https://github.com/Shopify/argo-admin/commit/575208901f6e7a5b37d2d0dfb2799c59fdbee15b))
* toast ([#483](https://github.com/Shopify/argo-admin/issues/483)) ([0898253](https://github.com/Shopify/argo-admin/commit/08982538144fade980752c71597ed3e574eaa2a8))
* update data-api with container changes ([#761](https://github.com/Shopify/argo-admin/issues/761)) ([24308ed](https://github.com/Shopify/argo-admin/commit/24308ed9459b93373dc5218c79674dcd812cd308))
* upgrade remote-ui 1.5.0 ([#1121](https://github.com/Shopify/argo-admin/issues/1121)) ([1350755](https://github.com/Shopify/argo-admin/commit/13507554568ad75872f2bd10a3ef417956411639))
* **app-chrome-container:** add playground example ([a1e314e](https://github.com/Shopify/argo-admin/commit/a1e314e845b1d573bb317eb5ba2a3373abfec1cb))
* **app-overlay:** update header ([f34da64](https://github.com/Shopify/argo-admin/commit/f34da64b789aa3be967c2e19f57ebe5f294f3ef5))
* **argo-admin-react:** create separate package for react components ([e6625cb](https://github.com/Shopify/argo-admin/commit/e6625cb365aca18ee3d211db45b60b7947312892))
* **card:** add card header ([d26d69f](https://github.com/Shopify/argo-admin/commit/d26d69fcf3c48c9356bc825a44f40ca097044df3))
* **components:** add OptionsList component ([7da5016](https://github.com/Shopify/argo-admin/commit/7da5016ad0bae7047b86b4e20d147cba6894cd08))


### Reverts

* Revert "chore: change to original remote-ui (#713)" ([5f9bd71](https://github.com/Shopify/argo-admin/commit/5f9bd715f285a0768455ff7ffe150f18d4d6f221)), closes [#713](https://github.com/Shopify/argo-admin/issues/713)
* Revert "v0.2.8-unstable.0" ([43e74ac](https://github.com/Shopify/argo-admin/commit/43e74ac80783b12ea596444e94b757996ae80d75))





## [0.7.6](https://github.com/Shopify/argo-admin/compare/v0.7.5...v0.7.6) (2020-11-20)

### Bug Fixes

- improve readme structure ([b42da3c](https://github.com/Shopify/argo-admin/commit/b42da3c1866f864559bc69176316602cc4c13a1b))
- update polaris and polaris icons ([4da7004](https://github.com/Shopify/argo-admin/commit/4da700468637e2a12b9f48c86f9599336b52869c))

## [0.7.5](https://github.com/Shopify/argo-admin/compare/v0.7.4...v0.7.5) (2020-11-05)

### Bug Fixes

- fix hotswap nested array object in remote-ui ([9be1bf6](https://github.com/Shopify/argo-admin/commit/9be1bf678a0f575150ab0d913223c452737e389f))

## [0.7.4](https://github.com/Shopify/argo-admin/compare/v0.7.3...v0.7.4) (2020-11-03)

### Bug Fixes

- fix remote-ui hotswap nested function ([76e31cd](https://github.com/Shopify/argo-admin/commit/76e31cd59db8a1609c876fd81ae2f79d4bbe8437))

## [0.7.3](https://github.com/Shopify/argo-admin/compare/v0.7.2...v0.7.3) (2020-11-02)

**Note:** Version bump only for package @shopify/argo-playground

## [0.7.2](https://github.com/Shopify/argo-admin/compare/v0.7.1...v0.7.2) (2020-10-29)

### Features

- hot-swap api ([#1096](https://github.com/Shopify/app-extension-libs/issues/1096)) ([473597b](https://github.com/Shopify/argo-admin/commit/473597bbacc846f194431a44ebb9c90a27b181d6))
- upgrade remote-ui 1.5.0 ([#1121](https://github.com/Shopify/app-extension-libs/issues/1121)) ([1350755](https://github.com/Shopify/argo-admin/commit/13507554568ad75872f2bd10a3ef417956411639))

## [0.7.1](https://github.com/Shopify/argo-admin/compare/v0.7.0...v0.7.1) (2020-10-22)

### Bug Fixes

- **playground:** inject script after content ([d47b830](https://github.com/Shopify/argo-admin/commit/d47b830f9837585a6f2fe1472d9e00af7f7dc8ea))
- **playground:** main menu icons ([2b25be6](https://github.com/Shopify/argo-admin/commit/2b25be6d959f4a5c374920905cac7e42a38d49df))

# [0.7.0](https://github.com/Shopify/argo-admin/compare/v0.6.0...v0.7.0) (2020-10-15)

### Bug Fixes

- **playground:** add style override for top-level cards ([719ef7f](https://github.com/Shopify/argo-admin/commit/719ef7fa52ca2cef94662175804230e990a186a7))
- **playground:** fix missing icon, polaris overrides ([a890eaf](https://github.com/Shopify/argo-admin/commit/a890eafb504e58e34bb4a32424d0241c03e1365a))

# [0.6.0](https://github.com/Shopify/argo-admin/compare/v0.6.0-alpha.0...v0.6.0) (2020-10-07)

**Note:** Version bump only for package @shopify/argo-playground

# [0.6.0-alpha.0](https://github.com/Shopify/argo-admin/compare/v0.5.0...v0.6.0-alpha.0) (2020-09-30)

### Features

- remove extension point enum ([06479db](https://github.com/Shopify/argo-admin/commit/06479db477722dad8fa5625cbc99274a07916037))
- rename subscription management ([#973](https://github.com/Shopify/app-extension-libs/issues/973)) ([5752089](https://github.com/Shopify/argo-admin/commit/575208901f6e7a5b37d2d0dfb2799c59fdbee15b))

# [0.5.0](https://github.com/Shopify/argo-admin/compare/v0.5.0-alpha.1...v0.5.0) (2020-09-30)

**Note:** Version bump only for package @shopify/argo-playground

# [0.5.0-alpha.1](https://github.com/Shopify/argo-admin/compare/v0.5.0-alpha.0...v0.5.0-alpha.1) (2020-09-29)

### Bug Fixes

- resource list onQueryClear reset the list items ([9209240](https://github.com/Shopify/argo-admin/commit/920924045cb94af2f81c3dc7b056883540e4a3f5))

# [0.5.0-alpha.0](https://github.com/Shopify/argo-admin/compare/v0.4.4...v0.5.0-alpha.0) (2020-09-28)

### Bug Fixes

- standardize form field naming ([5391b59](https://github.com/Shopify/argo-admin/commit/5391b598a9e6f516f2d4aff603d9aeee634d67e3))

### Features

- **app-overlay:** update header ([f34da64](https://github.com/Shopify/argo-admin/commit/f34da64b789aa3be967c2e19f57ebe5f294f3ef5))

## [0.4.4](https://github.com/Shopify/argo-admin/compare/v0.4.4-alpha.1...v0.4.4) (2020-09-24)

**Note:** Version bump only for package @shopify/argo-playground

## [0.4.4-alpha.1](https://github.com/Shopify/argo-admin/compare/v0.4.4-alpha.0...v0.4.4-alpha.1) (2020-09-23)

**Note:** Version bump only for package @shopify/argo-playground

## [0.4.4-alpha.0](https://github.com/Shopify/argo-admin/compare/v0.4.3...v0.4.4-alpha.0) (2020-09-18)

### Features

- add extension point to api ([f30fd1c](https://github.com/Shopify/argo-admin/commit/f30fd1cef7adedd86e0025d5f3d397113f4e5f3a))
- api consistency onclick to onpress ([6c68dd6](https://github.com/Shopify/argo-admin/commit/6c68dd6291cdaee34539c6a4357ba07f0190b075))
- radio and checkbox to use children not label ([e5c7705](https://github.com/Shopify/argo-admin/commit/e5c77051d6c3039aa40d912c699d049fa8d191a0))
- radio id and checked is optional ([9c3954e](https://github.com/Shopify/argo-admin/commit/9c3954e7852e0aa6d314a824c2e64dc68d967886))
- radio onchange gives value not id ([#914](https://github.com/Shopify/app-extension-libs/issues/914)) ([9202a9e](https://github.com/Shopify/argo-admin/commit/9202a9e16863153ceb686e5abdd604cee8b7841a))
- rename pressable to clickable ([e48be20](https://github.com/Shopify/argo-admin/commit/e48be20b3282f6299e225d4e7d937b2b0c70302a))
- rename radio button to radio ([5a15c0a](https://github.com/Shopify/argo-admin/commit/5a15c0a9ed25fb0b196252db059bd86601c72263))

## [0.4.3](https://github.com/Shopify/argo-admin/compare/v0.4.2...v0.4.3) (2020-09-15)

### Features

- error unsupported component ([#902](https://github.com/Shopify/app-extension-libs/issues/902)) ([938363e](https://github.com/Shopify/argo-admin/commit/938363e561225cdf24693f6a7e012016d37d851f))

## [0.4.2](https://github.com/Shopify/argo-admin/compare/v0.4.1...v0.4.2) (2020-08-26)

### Bug Fixes

- make links safe ([bac28f0](https://github.com/Shopify/argo-admin/commit/bac28f067f3861482adb872be2ba36cebdc8f4f8))

## [0.4.1](https://github.com/Shopify/argo-admin/compare/v0.4.0...v0.4.1) (2020-08-25)

### Bug Fixes

- **app-chrome-container:** remove unnecessary conditional ([cd99192](https://github.com/Shopify/argo-admin/commit/cd99192b17fae7a72d16f6b84f25c1e3ca398c6d))

### Features

- **app-chrome-container:** add playground example ([a1e314e](https://github.com/Shopify/argo-admin/commit/a1e314e845b1d573bb317eb5ba2a3373abfec1cb))

# [0.4.0](https://github.com/Shopify/argo-admin/compare/v0.4.0-alpha.0...v0.4.0) (2020-08-05)

**Note:** Version bump only for package @shopify/argo-playground

# [0.4.0-alpha.0](https://github.com/Shopify/argo-admin/compare/v0.3.0...v0.4.0-alpha.0) (2020-08-04)

### Features

- **argo-admin-react:** create separate package for react components ([e6625cb](https://github.com/Shopify/argo-admin/commit/e6625cb365aca18ee3d211db45b60b7947312892))

# [0.3.0](https://github.com/Shopify/argo-admin/compare/v0.2.8...v0.3.0) (2020-07-28)

### Features

- extension point components ([#820](https://github.com/Shopify/app-extension-libs/issues/820)) ([9be8c61](https://github.com/Shopify/argo-admin/commit/9be8c61f7a567be8b1c2ec13156a5dd3422182d0))

## [0.2.7](https://github.com/Shopify/argo-admin/compare/v0.2.6...v0.2.7) (2020-06-25)

**Note:** Version bump only for package @shopify/argo-playground

## [0.2.6](https://github.com/Shopify/argo-admin/compare/v0.2.5...v0.2.6) (2020-06-19)

**Note:** Version bump only for package @shopify/argo-playground

## [0.2.5](https://github.com/Shopify/argo-admin/compare/v0.2.4...v0.2.5) (2020-06-19)

**Note:** Version bump only for package @shopify/argo-playground

## [0.2.4](https://github.com/Shopify/argo-admin/compare/v0.2.3...v0.2.4) (2020-06-19)

**Note:** Version bump only for package @shopify/argo-playground

## [0.2.3](https://github.com/Shopify/argo-admin/compare/v0.2.2...v0.2.3) (2020-06-19)

**Note:** Version bump only for package @shopify/argo-playground

## [0.2.2](https://github.com/Shopify/argo-admin/compare/v0.2.1...v0.2.2) (2020-06-18)

**Note:** Version bump only for package @shopify/argo-playground

## [0.2.1](https://github.com/Shopify/argo-admin/compare/v0.1.3...v0.2.1) (2020-06-18)

**Note:** Version bump only for package @shopify/argo-playground

## [0.1.3](https://github.com/Shopify/argo-admin/compare/v0.1.2...v0.1.3) (2020-06-18)

### Bug Fixes

- reset independent versioning ([5e6761a](https://github.com/Shopify/argo-admin/commit/5e6761a0075b57538aacfc28f5437e647930a450))

## [0.1.2](https://github.com/Shopify/argo-admin/compare/v0.1.1...v0.1.2) (2020-06-18)

### Features

- update data-api with container changes ([#761](https://github.com/Shopify/app-extension-libs/issues/761)) ([24308ed](https://github.com/Shopify/argo-admin/commit/24308ed9459b93373dc5218c79674dcd812cd308))

## [0.1.1](https://github.com/Shopify/argo-admin/compare/v0.1.0...v0.1.1) (2020-06-18)

### Features

- rename modal actions to container api ([50746d5](https://github.com/Shopify/argo-admin/commit/50746d52f7a46a87d6c51a6989fb93ebdec2953b))

# [0.1.0](https://github.com/Shopify/argo-admin/compare/v0.0.65...v0.1.0) (2020-06-17)

### Features

- data api ([#704](https://github.com/Shopify/app-extension-libs/issues/704)) ([ac25d95](https://github.com/Shopify/argo-admin/commit/ac25d951af5e048a83c81b78dfdb3c37a2b6b48a))

## [0.0.65](https://github.com/Shopify/argo-admin/compare/v0.0.64...v0.0.65) (2020-06-04)

### Bug Fixes

- clean up webpack configs and package.json ([51becc4](https://github.com/Shopify/argo-admin/commit/51becc48730c30e18533f521eb969103003deedb))
- fix locale extension api ([d00a519](https://github.com/Shopify/argo-admin/commit/d00a519f9ebd6b7e1a226a76a9b931a5170e7dc0))

## [0.0.64](https://github.com/Shopify/argo-admin/compare/v0.0.63...v0.0.64) (2020-06-02)

### Bug Fixes

- re-add card action ([#602](https://github.com/Shopify/app-extension-libs/issues/602)) ([cdd6785](https://github.com/Shopify/argo-admin/commit/cdd6785c47417d4f6fe2e8e94bab64cb758a79b8))

### Features

- **components:** add OptionsList component ([7da5016](https://github.com/Shopify/argo-admin/commit/7da5016ad0bae7047b86b4e20d147cba6894cd08))

## [0.0.63](https://github.com/Shopify/argo-admin/compare/v0.0.63-alpha.0...v0.0.63) (2020-05-25)

### Features

- added readyState no script ([#563](https://github.com/Shopify/app-extension-libs/issues/563)) ([afa23f7](https://github.com/Shopify/argo-admin/commit/afa23f7b8d604b7f0d4b9983d4be877e2e85e3e9))

## [0.0.63-alpha.0](https://github.com/Shopify/argo-admin/compare/v0.0.62...v0.0.63-alpha.0) (2020-05-22)

### Features

- **card:** add card header ([d26d69f](https://github.com/Shopify/argo-admin/commit/d26d69fcf3c48c9356bc825a44f40ca097044df3))
- add component groups ([#514](https://github.com/Shopify/app-extension-libs/issues/514)) ([11fb50b](https://github.com/Shopify/argo-admin/commit/11fb50b0ad910d923405535d109a9f220a83d9e3))

## [0.0.62](https://github.com/Shopify/argo-admin/compare/v0.0.61...v0.0.62) (2020-05-19)

### Features

- add validation to select ([#521](https://github.com/Shopify/app-extension-libs/issues/521)) ([a13acd8](https://github.com/Shopify/argo-admin/commit/a13acd86c9545fe04a15f074ee79bf7b95dcd4de))
- enable displaying an error and loading state ([31d2a86](https://github.com/Shopify/argo-admin/commit/31d2a867a9248d5be4e1e98b8b4dee15031959a1))

## [0.0.61](https://github.com/Shopify/argo-admin/compare/v0.0.60...v0.0.61) (2020-05-14)

### Bug Fixes

- replace render error image ([#500](https://github.com/Shopify/app-extension-libs/issues/500)) ([dc87105](https://github.com/Shopify/argo-admin/commit/dc87105f9ee6352fffd13611bb3c42e0bd4a4f7e))

## [0.0.60](https://github.com/Shopify/argo-admin/compare/v0.0.59...v0.0.60) (2020-05-08)

### Bug Fixes

- correct name SubscriptionManagement ([#496](https://github.com/Shopify/app-extension-libs/issues/496)) ([3577d00](https://github.com/Shopify/argo-admin/commit/3577d009f9a416c4636fdb1a7ebd29379020bc0b))

### Features

- radiobutton ([0438e25](https://github.com/Shopify/argo-admin/commit/0438e25b15cdc504a03b2cdc28b9526e83ed2b15))
- toast ([#483](https://github.com/Shopify/app-extension-libs/issues/483)) ([0898253](https://github.com/Shopify/argo-admin/commit/08982538144fade980752c71597ed3e574eaa2a8))

## [0.0.59](https://github.com/Shopify/argo-admin/compare/v0.0.58...v0.0.59) (2020-05-07)

### Features

- add product data input ([305d464](https://github.com/Shopify/argo-admin/commit/305d464dff656ee4fc3f702f36601ddba309eeec))
- add render timeout hook and example playground ([#473](https://github.com/Shopify/app-extension-libs/issues/473)) ([5976199](https://github.com/Shopify/argo-admin/commit/5976199b669d95ce539a021dc484148ef1f0d1bf))

## [0.0.58](https://github.com/Shopify/argo-admin/compare/v0.0.57...v0.0.58) (2020-05-06)

**Note:** Version bump only for package @shopify/argo-playground

## [0.0.57](https://github.com/Shopify/argo-admin/compare/v0.0.56...v0.0.57) (2020-05-05)

**Note:** Version bump only for package @shopify/argo-playground

## [0.0.56](https://github.com/Shopify/argo-admin/compare/v0.0.55...v0.0.56) (2020-05-05)

**Note:** Version bump only for package @shopify/argo-playground

## [0.0.55](https://github.com/Shopify/argo-admin/compare/v0.0.54...v0.0.55) (2020-05-05)

**Note:** Version bump only for package @shopify/argo-playground

## [0.0.54](https://github.com/Shopify/argo-admin/compare/v0.0.53...v0.0.54) (2020-05-04)

**Note:** Version bump only for package @shopify/argo-playground

## [0.0.53](https://github.com/Shopify/argo-admin/compare/v0.0.52...v0.0.53) (2020-05-01)

**Note:** Version bump only for package @shopify/app-extensions-playground

## [0.0.52](https://github.com/Shopify/argo-admin/compare/v0.0.51...v0.0.52) (2020-04-30)

### Bug Fixes

- input types and Argo modal infinite re-render issue ([15331cb](https://github.com/Shopify/argo-admin/commit/15331cb251092c1e7984a8ba0e59afc9a64f6495))

## [0.0.51](https://github.com/Shopify/argo-admin/compare/v0.0.50...v0.0.51) (2020-04-28)

### Bug Fixes

- fix infinite loop due to callback arguments ([a409c66](https://github.com/Shopify/argo-admin/commit/a409c669fe4f7a325b4b611374894b92b144dd0a))

### Features

- add disabled prop to Button component ([0359815](https://github.com/Shopify/argo-admin/commit/0359815dcc346b002fe25e3dcecb2e637957dcbf))

## [0.0.50](https://github.com/Shopify/argo-admin/compare/v0.0.49...v0.0.50) (2020-04-28)

### Bug Fixes

- clean up hooks inside ArgoExtension ([b44d393](https://github.com/Shopify/argo-admin/commit/b44d3937942d4092fd9bd97c513b548349c88504))

### Features

- add LocaleInput ([6f6b88d](https://github.com/Shopify/argo-admin/commit/6f6b88d9c413829a07a412bcf23c8a629d9d547d))

## [0.0.49](https://github.com/Shopify/argo-admin/compare/v0.0.48...v0.0.49) (2020-04-24)

### Features

- add argo modal container ([2511eaa](https://github.com/Shopify/argo-admin/commit/2511eaa457c12b20490b561bcf31cdd87f137538))
- enable web worker to load inline app extension scripts ([847d874](https://github.com/Shopify/argo-admin/commit/847d874095dd0cbe0a5c956f645bd056d104a27f))
- hook up modal action inputs ([9784bfe](https://github.com/Shopify/argo-admin/commit/9784bfe4bf5c5bade33b394bce1d79b93d255e46))

## [0.0.48](https://github.com/Shopify/argo-admin/compare/v0.0.47...v0.0.48) (2020-04-22)

**Note:** Version bump only for package @shopify/app-extensions-playground

## [0.0.47](https://github.com/Shopify/argo-admin/compare/v0.0.46...v0.0.47) (2020-04-22)

### Features

- add banner component ([35914bf](https://github.com/Shopify/argo-admin/commit/35914bfaad320ee1b07260edcf82bef78e3d8b9c))
- add clearButton prop to Textfield ([feb1733](https://github.com/Shopify/argo-admin/commit/feb1733d119b0c88bbfd658371f8fb6d51025bab))
- add in-line errors to textfield component ([c0a2ee8](https://github.com/Shopify/argo-admin/commit/c0a2ee8257cffeb976166938c7dbc5e7b3e6b2ff))
- add ResourceList component ([4d6dc99](https://github.com/Shopify/argo-admin/commit/4d6dc993ddb8a0dbe47f7a78ca45cc58dda6cda7))
- add suffix prop to texrfield ([27e452f](https://github.com/Shopify/argo-admin/commit/27e452f043bcec7531713efbcb2ebcc974df73a2))

## [0.0.46](https://github.com/Shopify/argo-admin/compare/v0.0.45...v0.0.46) (2020-04-20)

**Note:** Version bump only for package @shopify/app-extensions-playground

## [0.0.45](https://github.com/Shopify/argo-admin/compare/v0.0.44...v0.0.45) (2020-04-17)

### Features

- add number textfield ([26df79c](https://github.com/Shopify/argo-admin/commit/26df79cbc07e09f1eb8764ad00505fc448a86ea1))

## [0.0.44](https://github.com/Shopify/argo-admin/compare/v0.0.43...v0.0.44) (2020-04-17)

### Features

- add SessionTokenInput ([e8532b9](https://github.com/Shopify/argo-admin/commit/e8532b986e403bdf7d10540284cd90b386dd4ab1))

## [0.0.43](https://github.com/Shopify/argo-admin/compare/v0.0.42...v0.0.43) (2020-04-16)

### Features

- add link and toast components ([2830599](https://github.com/Shopify/argo-admin/commit/2830599aa686bf9c055c36078c9f7008819783c9))

## [0.0.42](https://github.com/Shopify/argo-admin/compare/v0.0.41...v0.0.42) (2020-04-13)

### Features

- add Modal component ([9ee5b22](https://github.com/Shopify/argo-admin/commit/9ee5b221e43812cfaa8301593f54960ae714c7fb))
- add ResizeObserver ([60ccf8b](https://github.com/Shopify/argo-admin/commit/60ccf8b16ba9ab88929d9798409947cc9d3a205a))
- add Spinner component ([0c2a2e7](https://github.com/Shopify/argo-admin/commit/0c2a2e761bac18bc7f36ba05baefc73efe3c1c7a))
- implement Select component ([798c333](https://github.com/Shopify/argo-admin/commit/798c3337e0025818939a753b1b5bb173b2bf50ee))
- support screen size ([a6df892](https://github.com/Shopify/argo-admin/commit/a6df892ead47ce038a63a3e11698bc72b859cd96))

## [0.0.41](https://github.com/Shopify/argo-admin/compare/v0.0.40...v0.0.41) (2020-04-07)

### Bug Fixes

- fix maximum stack size in host components ([650af48](https://github.com/Shopify/argo-admin/commit/650af484d9fa0e4ba86971ef78855bb8915545b1))

### Features

- slight design adjustments ([0e1f337](https://github.com/Shopify/argo-admin/commit/0e1f337d0452a0a45b4d59d0d430e23ce8c9a3e3))
- **api:** connect extension to graphql ([59c8730](https://github.com/Shopify/argo-admin/commit/59c8730989b52f7522c8b8214716bd55e144985c))

## [0.0.40](https://github.com/Shopify/argo-admin/compare/v0.0.39...v0.0.40) (2020-04-01)

### Bug Fixes

- fix TextField component props ([f5809c9](https://github.com/Shopify/argo-admin/commit/f5809c92f10e0d5f79fb33f864da60a38bd32670))

### Features

- **components:** add clickable component ([a93dd1e](https://github.com/Shopify/argo-admin/commit/a93dd1e233e2ab7d6fad4334a151dd6b0380730b))
- **product-reviews:** generate review list from placeholder data ([f76aaef](https://github.com/Shopify/argo-admin/commit/f76aaef9bc101b367a796d9d12813462aaab3555))
- add Badge component ([26abe81](https://github.com/Shopify/argo-admin/commit/26abe81165a612992c0d7d9fcbf0e312ec9cdcfc))
- add Button component ([1c2a41d](https://github.com/Shopify/argo-admin/commit/1c2a41d807d276d39f25dfbb4a876777f8fd95fb))
- add Checkbox component ([109c37b](https://github.com/Shopify/argo-admin/commit/109c37bc7561da100c5e8dd44df6c4cd324ccb17))
- add mobile worker ([c0182ae](https://github.com/Shopify/argo-admin/commit/c0182ae5d49c3663b0d5385208136160f806e076))
- adds AppReviewList UI ([8367b1e](https://github.com/Shopify/argo-admin/commit/8367b1ef083cb3cd565d5e989faf2bb44d01bccf))
- adds StackItem component ([91a1eaf](https://github.com/Shopify/argo-admin/commit/91a1eaffcdf4e35e70a12d0565f6b1ec7b1e08a6))
- **icon:** add Icon component ([b570e38](https://github.com/Shopify/argo-admin/commit/b570e38c1de5e6f0279fb254624f4f0f31e2c6eb))