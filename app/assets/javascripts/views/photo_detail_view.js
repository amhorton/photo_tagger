(function() {

  if (typeof PhotoTagger === 'undefined') { window.PhotoTagger = {}; }

  var PhotoDetailView = PhotoTagger.PhotoDetailView = function (photo) {
    this.$el = $("<div class='detail-view'></div>");
    this.photo = photo;

    this.$el.on("click", ".photo-container", function (event) {
      console.log(event);

      var x = event.pageX - event.currentTarget.offsetLeft
      var y = event.pageY - event.currentTarget.offsetTop

      $(".photo-tag").removeClass("hidden")

      $(".photo-tag").css( {
        top: y,
        left: x
      })

    });
  };

  PhotoDetailView.prototype.render = function () {
    var templateFn = JST["photo_detail"];
    this.$el.append(templateFn({ photo: this.photo }));
    return this;
  };

})();