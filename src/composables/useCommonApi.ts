import { adaptOldFormat } from '../misc/scanner'

export const useCommonApi = (emit: ReturnType<typeof defineEmits>) => {
  // methods
  const onDetect = async (resultPromise: Promise<ReturnType<typeof adaptOldFormat>>) => {
    emit('detect', resultPromise)

    try {
      const { content } = await resultPromise

      if (content !== null) {
        emit('decode', content)
      }
    } catch (error) {
      // fail silently
    }
  }

  return { onDetect }
}
