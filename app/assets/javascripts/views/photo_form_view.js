(function() {

  if (typeof PhotoTagger === "undefined") { window.PhotoTagger = {}; }

  PhotoFormView = PhotoTagger.PhotoFormView = function () {
    this.$el = $("<div class='form-view'></div>");
    var that = this;

    this.$el.on("submit", function (event) {
      event.preventDefault();
      that.submit(event);
    });
  };

  PhotoFormView.prototype.render = function () {
    var templateFn = JST["photo_form"];
    this.$el.append(templateFn());
    return this;
  };

  PhotoFormView.prototype.submit = function (event) {
    var attributes = this.$el.find("form").serializeJSON().photo;
    var newPhoto = new PhotoTagger.Photo(attributes);

    newPhoto.create(function(data) {
      console.log(data);
    });
  };

})();