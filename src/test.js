const browserStorageParser = require('./index')

describe('Browser Storage Parser', () => {
  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  describe('getFromLocalStorage', () => {
    it('gets object from local storage when it exists and is a string', () => {
      localStorage.setItem('test', 'test')
      expect(browserStorageParser.getFromLocalStorage('test')).toEqual('test')
    })

    it('gets object from local storage when it exists and is an object', () => {
      localStorage.setItem('test', JSON.stringify({ test: 'test' }))
      expect(browserStorageParser.getFromLocalStorage('test')).toEqual({ test: 'test' })
    })

    it('gets object from session storage when local storage errors and sessionFallback is true', () => {
      localStorage.setItem('test', JSON.stringify({ test: 'test' }))
      sessionStorage.setItem('test', JSON.stringify({ test: 'test session' }))
      spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
        throw new Error()
      })
      expect(browserStorageParser.getFromLocalStorage('test', true)).toEqual({ test: 'test session' })
      spy.mockRestore()
    })

    it('returns undefined when local storage errors and sessionFallback is false', () => {
      localStorage.setItem('test', JSON.stringify({ test: 'test' }))
      sessionStorage.setItem('test', JSON.stringify({ test: 'test session' }))
      spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
        throw new Error()
      })
      expect(browserStorageParser.getFromLocalStorage('test', false)).toEqual(undefined)
      spy.mockRestore()
    })
  })

  describe('getFromSessionStorage', () => {
    it('gets object from session storage when it exists and is a string', () => {
      sessionStorage.setItem('test', 'test')
      expect(browserStorageParser.getFromSessionStorage('test')).toEqual('test')
    })

    it('gets object from session storage when it exists and is an object', () => {
      sessionStorage.setItem('test', JSON.stringify({ test: 'test' }))
      expect(browserStorageParser.getFromSessionStorage('test')).toEqual({ test: 'test' })
    })
  })

  describe('saveToLocalStorage', () => {
    it('saves object to local storage when is string', () => {
      browserStorageParser.saveToLocalStorage('test', 'testing')
      expect(localStorage.getItem('test')).toEqual('testing')
    })

    it('saves object to local storage when is object', () => {
      browserStorageParser.saveToLocalStorage('test', { test: 'testing' })
      expect(localStorage.getItem('test')).toEqual('{"test":"testing"}')
    })

    it('saves object to session storage when local storage errors and sessionFallback is true', () => {
      spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
        throw new Error()
      })
      browserStorageParser.saveToLocalStorage('test', 'testing session fallback', true)
      expect(localStorage.getItem('test')).toEqual(null)
      expect(sessionStorage.getItem('test')).toEqual('testing session fallback')
      spy.mockRestore()
    })

    it('does not save object to session storage when local storage errors and sessionFallback is false', () => {
      spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
        throw new Error()
      })
      browserStorageParser.saveToLocalStorage('test', 'testing session fallback', false)
      expect(localStorage.getItem('test')).toEqual(null)
      expect(sessionStorage.getItem('test')).toEqual(null)
      spy.mockRestore()
    })
  })

  describe('saveToSessionStorage', () => {
    it('saves object to session storage when is string', () => {
      browserStorageParser.saveToSessionStorage('test', 'testing')
      expect(sessionStorage.getItem('test')).toEqual('testing')
    })

    it('saves object to session storage when is object', () => {
      browserStorageParser.saveToSessionStorage('test', { test: 'testing' })
      expect(sessionStorage.getItem('test')).toEqual('{"test":"testing"}')
    })
  })

  describe('parseStorageObject', () => {
    it('returns undefined if parameter is null or undefined', () => {
      expect(browserStorageParser.parseStorageObject()).toEqual(undefined)
    })
  })
})
