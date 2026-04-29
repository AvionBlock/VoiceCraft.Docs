import { buildConfiguredAddonArchive, type TransportMode } from '../../utils/addon-configurator'

type BuildRequestBody = {
  version?: string
  transportMode?: TransportMode
  levelDatBase64?: string
  levelDatFileName?: string
}

function base64ToBytes(value: string) {
  const buffer = Buffer.from(value, 'base64')
  return new Uint8Array(buffer)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<BuildRequestBody>(event)

  if (!body.version || !body.levelDatBase64 || !body.transportMode) {
    throw createError({
      statusCode: 400,
      statusMessage: 'version, transportMode, and levelDatBase64 are required.',
    })
  }

  const archiveBytes = await buildConfiguredAddonArchive({
    version: body.version,
    transportMode: body.transportMode,
    levelDatBytes: base64ToBytes(body.levelDatBase64),
  })

  setHeader(event, 'content-type', 'application/zip')
  setHeader(event, 'content-disposition', `attachment; filename="voicecraft-addon-${body.version.toLowerCase()}.zip"`)

  return archiveBytes
})
