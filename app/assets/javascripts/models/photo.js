(function() {

  if (typeof PhotoTagger === 'undefined') { window.PhotoTagger = {}; }

  var Photo = PhotoTagger.Photo = function (attributes) {
    this.attributes = _.extend({}, attributes);
  };

  Photo.all = [];
  Photo._events = {};

  Photo.on = function (eventName, callback) {
    if (Photo._events[eventName]) {
      Photo._events[eventName].push(callback);
    } else {
      Photo._events[eventName] = [callback];
    }
  };

  Photo.trigger = function (eventName) {
    Photo._events[eventName].forEach(function(callback) {
      callback();
    });
  };

  Photo.fetchByUserId = function (userId, callback) {
    $.ajax({
      url: "/api/users/" + userId + "/photos",
      type: "GET",
      dataType: "json",
      success: function (data) {
        data.forEach(function(attrs) { Photo.all.push(new Photo(attrs)); });
        callback(Photo.all);
        return Photo.all;
      }
    });
  };

  Photo.prototype.get = function (attr_name) {
    return this.attributes[attr_name.toString()];
  };

  Photo.prototype.set = function (attr_name, val) {
    this.attributes[attr_name.toString()] = val;
  };

  Photo.prototype.create = function (callback) {
    if (this.get("id")) {
      return false;
    }

    var that = this;

    $.ajax({
      url: "/api/photos",
      type: "POST",
      dataType: "json",
      data: { "photo": this.attributes },
      success: function(data) {
        that.set("id", data.id);
        Photo.all.push(that);
        Photo.trigger("add");
        callback(data);
      }
    });
  };

  Photo.prototype.save = function (callback) {
    var that = this;
    var id = this.get("id");

    if (id) {
      $.ajax({
        url: "/api/photos/" + id,
        type: "PUT",
        dataType: "json",
        data: { "photo": this.attributes },
        success: function(data) {
          _.extend(that.attributes, JSON.parse(data));
          callback(that.attributes);
        }
      });

    } else {
      this.create(callback);
    }
  };



})();


