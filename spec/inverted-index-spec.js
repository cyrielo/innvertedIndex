"use strict";
describe('InvertedIndex',function(){
  let index = require('../src/inverted-index');
  let book_path = 'C:/Users/Cyrielo/Documents/CYRIELO DOCUMENTS/Development/'+
    'Web Apps/invertedIndex/jasmine/books.json';
  index.createIndex(book_path).then( data =>{

  });

  describe("Read book data", function() {

    it("should reads the JSON file and asserts that it is not empty", function(done){
      index.readJsonFile(book_path).then( data =>{
        expect( index.isEmpty(data) ).toBe(false);
        done();
      });

    });

    /*Ensure each object in JSON array contains a property whose
     value is a string.*/
    it('should ensure each object in JSON array contains a property whose' +
      ' value is a string', function(done){
      index.readJsonFile(book_path).then( data =>{
        for(let obj of data){
          expect( typeof obj.title ).toEqual('string');
          expect( typeof obj.text ).toEqual('string');
        }
        done();
      });
    });

  });

  describe('Populate Index', function(){

    it('should verify that the index is created', function(){
      expect( Object.keys(index.invertedIndexes).length ).toBeGreaterThan(0);
    });

    it('should verifies the index maps the string keys to the correct' +
      ' objects in the JSON array', function(){

    });

  });

  describe('Search index', function(){
    it('should ensure search does not take too long to execute',function(){
      let runtime_threshold = 1000;
      let current_millisecond =  new Date().getMilliseconds();

      index.searchIndex('Alice', ['Fellowship', ['dwarf'], 'in'  ]);

      let final_milliseconds =  new Date().getMilliseconds();
      let time_difference = final_milliseconds - current_millisecond;

      expect( time_difference ).toBeLessThan( runtime_threshold );

    });

    it('should ensure searchIndex can handle a varied number of search terms as ' +
      'arguments',function(){
      expect( index.searchIndex('Alice', 'Cyril', 'Lord') ).toEqual(['0', '', '1']);
    });

    it('should ensure searchIndex can handle an array of search terms',function(){
      expect(index.searchIndex('Alice', ['Fellowship', ['dwarf']  ]) ).toEqual(
        ['0', '1', '1'] );
    });

    it('should be able to search a specific index', function(){
      expect(index.searchSpecificIndex( 'Alice', book_path ) ).toEqual(['0']);
    });

  });

});