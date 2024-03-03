[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

## About

A GitHub Action that post the docker image tags as a comment in the pull-request.

![image](https://github.com/jizusun/docker-tags-pr-comment-action/assets/4011348/6e61f6b0-ac06-4752-a366-e685c308c5b7)
<https://github.com/jizusun/action-detect-secrets/pull/3#issuecomment-1975006232>



## Usage

```yaml
- name: Extract Docker metadata
  id: meta
  uses: docker/metadata-action@96383f45573cb7f253c731d3b3ab81c87ef81934 # v5.0.0
  with:
    images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
    tags: |
      type=ref,event=branch
      type=ref,event=pr
      type=semver,pattern={{version}}
      type=semver,pattern={{major}}.{{minor}}
      type=sha

- name: Build and push Docker image
  id: build-and-push
  uses: docker/build-push-action@0565240e2d4ab88bba5387d719585280857ece09 # v5.0.0
  with:
    context: .
    push: ${{ github.event_name != 'pull_request' }}
    tags: ${{ steps.meta.outputs.tags }}
    labels: ${{ steps.meta.outputs.labels }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
    platforms: linux/amd64,linux/arm64

- name: Docker tags as a PR comment
  uses: jizusun/docker-tags-pr-comment-action/composite@main
  if: github.event_name == 'pull_request'
  with:
    docker-tags: ${{ steps.meta.outputs.tags }}
```