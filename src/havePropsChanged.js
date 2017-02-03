module.exports = function havePropsChanged(prevProps, nextProps, keys) {
  const changedProps = []
  keys.forEach(key => {
    if (prevProps[key] != nextProps[key]) {
      changedProps.push(key)
    }
  })
  return changedProps
}
