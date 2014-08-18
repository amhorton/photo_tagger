(function() {

  if (typeof PhotoTagger === 'undefined') { window.PhotoTagger = {}; }

  var PhotoListView = PhotoTagger.PhotoListView = function () {
    this.$el = $("<div class='list-view'></div>");

    PhotoTagger.Photo.on("add", this.render.bind(this));

    this.$el.on("click", "a.photo-link", function (event) {
      event.preventDefault();
      var targetPhotoId = $(event.currentTarget).attr("data-photo-id");
      var targetPhoto = null;

      PhotoTagger.Photo.all.forEach(function(photo) {
        if (photo.get("id") === parseInt(targetPhotoId)) {
          targetPhoto = photo;
        }
      });

      $(".detail-view").remove();
      PhotoTagger.showPhotoDetail(targetPhoto);
    });
  };

  PhotoListView.prototype.render = function () {
    this.$el.html("");
    this.$el.append("<ul id='photos'></ul>");
    var photosUl = this.$el.find("#photos")[0];

    PhotoTagger.Photo.all.forEach(function(photo) {
      $(photosUl).append(
        "<li><a data-photo-id='" + photo.get("id") +
        "' class='photo-link' href='#'>" + photo.get("title") +
        "</a></li>"
      );
    })

    return this;
  }

})();