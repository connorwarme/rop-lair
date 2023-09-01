const decodeEscapedData = (input) => {
  if (input && input.includes('&')) {
    const doc = new DOMParser().parseFromString(input, 'text/html')
    return doc.documentElement.textContent
  } else {
    return input
  }
}

export default decodeEscapedData