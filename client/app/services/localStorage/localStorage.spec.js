import localStorageService from './localStorage.service';

describe('Local Storage Service', () => {
  let service;
  
  beforeEach(() => {
    service = new localStorageService();
    window.localStorage.setItem('securedTransmission', '{"a": "b"}');

  });

  it('tests load function when nothing has been set', () => {
    expect(service.load()).to.equal('{"a": "b"}');
  });

  it('tests load function for an item that is set', () => {
    window.localStorage.setItem('securedTransmission', '{"hello": "world"}');
    expect(service.load('securedTransmission')).to.equal('{"hello": "world"}');
  });
  
  it('tests set function for a json value overwrite should work', () => {
    window.localStorage.setItem('securedTransmission', '{"hello": "world"}');
    const dataString = service.load();
    expect(dataString).to.equal('{"hello": "world"}');

    service.set('hello', 'the whole world');
    expect(window.localStorage.getItem('securedTransmission')).to.equal('{"hello":"the whole world"}');
  });

  it('tests set function for a json value when adding a property should work', () => {
    service.set('something_else', 'other value');
    expect(window.localStorage.getItem('securedTransmission')).to.equal('{"a":"b","something_else":"other value"}');
  });

  it('tests get function when one item exists', () => {
      expect(service.get('a')).to.equal('b');
  });

  it('tests get function when two items exists', () => {
      expect(service.get('a')).to.equal('b');

      service.set('something_else', 'other value');
      expect(service.get('something_else')).to.equal('other value');
  });

  it('tests get function when item doesnt exist', () => {
      expect(service.get('a')).to.equal('b');

      expect(service.get('b')).to.equal(undefined);
  });

});

