export const loadSprite = async (): Promise<void> => {
  const sprite: { default: string } = await import('@/assets/sprite.svg?raw')

  const spriteContainer: HTMLDivElement = document.createElement('div')
  spriteContainer.style.position = 'absolute'
  spriteContainer.style.width = '0'
  spriteContainer.style.height = '0'
  spriteContainer.style.overflow = 'hidden'
  spriteContainer.style.visibility = 'hidden'
  spriteContainer.innerHTML = sprite.default

  document.body.insertBefore(spriteContainer, document.body.firstChild ?? null)
}
