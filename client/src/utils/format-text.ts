export const longWordInTheText = (text: string, maxWordLength: number) => {
    const words = text.split(' ')
    let res_words = []
    for (const word of words) {
        if (word.length > maxWordLength) {
            res_words.push(word.slice(0, maxWordLength) + '...')
        } else {
            res_words.push(word)
        }
    }
    return res_words.join(' ')
}
