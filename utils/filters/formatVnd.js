// x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
export default (val) => {
  return val.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
}
