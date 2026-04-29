import { fetchAddonReleases } from '../../utils/addon-configurator'

export default defineEventHandler(async () => {
  const releases = await fetchAddonReleases()

  return {
    releases: releases.map((release) => ({
      tag: release.tag,
      name: release.name,
      publishedAt: release.publishedAt,
    })),
  }
})
