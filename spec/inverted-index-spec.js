'use strict';
describe('InvertedIndex', ()=> {
  let index = require('../src/inverted-index');
  let bookPath = 'jasmine/books.json';
  let docPath = 'jasmine/document.json';
  index.createIndex(bookPath).then(data => {

  });

  describe('Read book data', ()=> {

    it('should reads the JSON file and asserts that it is not empty', done => {
      index.readJsonFile(bookPath).then(data => {
        expect(index.isEmpty(data)).toBe(false);
        done();
      });

    });

    /*Ensure each object in JSON array contains a property whose
     value is a string.*/
    it('should ensure each object in JSON array contains a property whose' +
      ' value is a string',  done => {
      index.readJsonFile(bookPath).then(data => {
        for (let obj of data) {
          expect(typeof obj.title).toEqual('string');
          expect(typeof obj.text).toEqual('string');
        }

        done();
      });
    });

  });

  describe('Populate Index', ()=> {

    it('should verify that the index is created', ()=> {
      expect(Object.keys(index.invertedIndexes).length).toBeGreaterThan(0);
    });

    it('should verifies the index maps the string keys to the correct' +
      ' objects in the JSON array', ()=> {
      expect(index.searchIndex('Alice', 'elf')).toEqual(['0', '1']);
    });

    it('Should verify data multiple index could be built', done=> {
      index.createIndex(docPath).then(()=> {
        expect(Object.keys(index.invertedIndexes).length).toEqual(2);
        done();
      });
    });

    it("Should be able to delete an invertedIndex object by it 's file path", () => {
      index.removeIndex(docPath);
      expect(Object.keys(index.invertedIndexes).length).toEqual(1);
    });
  });

  describe('Search index', () => {
    it('should ensure search does not take too long to execute', ()=> {
      let runtimeThreshold = 1000;
      let currentMillisecond =  new Date().getMilliseconds();

      index.searchIndex('Alice', ['Fellowship', ['dwarf'], 'in']);

      let finalMilliseconds =  new Date().getMilliseconds();
      let timeDifference = finalMilliseconds - currentMillisecond;

      expect(timeDifference).toBeLessThan(runtimeThreshold);

    });

    it('should ensure searchIndex can handle a varied number of search terms as ' +
    'arguments', () => {
      expect(index.searchIndex('Alice', 'Cyril', 'Lord')).toEqual(['0', '', '1']);
    });

    it('should ensure searchIndex can handle an array of search terms', () => {
      expect(index.searchIndex('Alice', ['Fellowship', ['dwarf']])).toEqual(
        ['0', '1', '1']);
    });

    it('should be able to search a specific index', () => {
      expect(index.searchSpecificIndex('Alice', bookPath)).toEqual(['0']);
    });

  });

});
