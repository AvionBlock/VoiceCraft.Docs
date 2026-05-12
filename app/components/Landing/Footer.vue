<template>
  <footer id="Footer" class="bg-theme-tertiary glass mt-5 container-fluid">
    <Container>
      <Row py="5" g="5" g-lg="0" align-items="start">
        <Col col="12" lg="4">
          <div class="comf-600-30px d-block mb-2">
            <span class="nuni-800-40 brand-primary">Voice</span><span class="nuni-800-40 brand-accent">Craft</span>
          </div>
          <p class="footer-caption">{{ $t("footer.caption") }}</p>
        </Col>

        <Col col="12" lg="8">
          <Row>
            <Col md="6" lg="6">
              <h4 class="mb-3 footer-text">{{ $t("footer.contacts") }}</h4>
              <ul class="nav flex-column">
                <li class="nav-item mb-2">
                  <a href="mailto:vc@avion.team" class="nav-link p-0 text-body-secondary">
                    {{ $t("footer.email") }}: vc@avion.team
                  </a>
                </li>
              </ul>
            </Col>

            <Col md="6" lg="6">
              <h4 class="mb-3 footer-text">{{ $t("footer.resources") }}</h4>
              <ul class="nav flex-column">
                <li class="nav-item mb-2">
                  <NuxtLink to="/" class="nav-link p-0 text-body-secondary">
                    {{ $t("footer.docs") }}
                  </NuxtLink>
                </li>
                <li class="nav-item mb-2">
                  <a
                    href="https://github.com/AvionBlock/VoiceCraft"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="nav-link p-0 text-body-secondary"
                  >
                    GitHub
                  </a>
                </li>
                <li class="nav-item mb-2">
                  <a
                    href="https://discord.gg/vsUB7FsRu4"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="nav-link p-0 text-body-secondary"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>

      <hr class="my-0 mt-3">

      <Row class="gradient-border-top pt-4" row-cols="1">
        <Col class="text-center text-md-start d-flex flex-column align-items-center align-items-md-start">
          <p class="my-0">© {{ currentYear }} Avion Team</p>
        </Col>
      </Row>
    </Container>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped lang="scss" src="../../assets/styles/components/landing/_footer.scss"></style>
