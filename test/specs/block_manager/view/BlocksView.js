var Backbone = require('backbone');
var BlocksView = require('block_manager/view/BlocksView');
var Blocks = require('block_manager/model/Blocks');

module.exports = {
  run() {
      describe('BlocksView', () => {

        var $fixtures;
        var $fixture;
        var model;
        var view;
        var editorModel;
        var ppfx;

        before(() => {
          $fixtures = $('#fixtures');
          $fixture = $('<div class="devices-fixture"></div>');
        });

        beforeEach(() => {
          model = new Blocks([]);
          view = new BlocksView({ collection: model });
          $fixture.empty().appendTo($fixtures);
          $fixture.html(view.render().el);
        });

        afterEach(() => {
          view.collection.reset();
        });

        after(() => {
          $fixture.remove();
        });

        it("The container is not empty", () => {
          expect(view.el.outerHTML).toExist();
        });

        it("No children inside", () => {
          expect(view.getBlocksEl().children.length).toEqual(0);
        });

        it("Render children on add", () => {
          model.add({});
          expect(view.getBlocksEl().children.length).toEqual(1);
          model.add([{},{}]);
          expect(view.getBlocksEl().children.length).toEqual(3);
        });

        it("Destroy children on remove", () => {
          model.add([{},{}]);
          expect(view.getBlocksEl().children.length).toEqual(2);
          model.at(0).destroy();
          expect(view.getBlocksEl().children.length).toEqual(1);
        });

        describe('With configs', () => {

          beforeEach(() => {
            ppfx = 'pfx-t-';
            editorModel = new Backbone.Model();
            model = new Blocks([
              {name:'test1'},
              {name:'test2'}
            ]);
            view = new BlocksView({
              collection: model,
            },{
              pStylePrefix: ppfx
            });
            $fixture.empty().appendTo($fixtures);
            $fixture.html(view.render().el);
          });

          it("Render children", () => {
            expect(view.getBlocksEl().children.length).toEqual(2);
          });

          it("Render container", () => {
            expect(view.getBlocksEl().getAttribute('class')).toEqual(ppfx + 'blocks-c');
          });

        });

    });
  }
};
