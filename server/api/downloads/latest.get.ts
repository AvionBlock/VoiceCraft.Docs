type GitLabRelease = {
  tag_name: string
  assets?: {
    links?: { name: string, url: string, direct_asset_url?: string }[]
  }
}

const latestReleaseApi = 'https://gitlab.avion.team/api/v4/projects/1/releases/permalink/latest'

export default cachedEventHandler(async () => {
  const release = await $fetch<GitLabRelease>(latestReleaseApi)
  const assets = (release.assets?.links ?? [])
    .filter(asset => /^VoiceCraft\.(Client|Server)\..+\.zip$/.test(asset.name))
    .map(asset => ({ name: asset.name, url: asset.direct_asset_url || asset.url }))

  if (!assets.length) {
    throw createError({ statusCode: 502, statusMessage: 'The latest GitLab release has no client or server archives.' })
  }

  return { tag: release.tag_name, assets }
}, { maxAge: 600, swr: true })
