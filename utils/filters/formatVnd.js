// x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
export default (val) => {
  if (val !== null && val !== undefined) {
    return val.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  }
}
