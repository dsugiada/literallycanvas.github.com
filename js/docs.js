// Generated by CoffeeScript 1.3.3
(function() {
  var uploadToImgur;

  uploadToImgur = function($lc, imgurKey) {
    var d, img, opts;
    opts = _.extend({
      name: 'drawing.png',
      title: 'A Drawing',
      caption: 'Drawn with Literally Canvas - http://steveasleep.com/literallycanvas'
    }, opts);
    d = new $.Deferred();
    if (!imgurKey) {
      d.reject("This application is not configured to support Imgur.");
      d.promise();
      return d;
    }
    if (!$lc.get(0).literallycanvas.shapes.length) {
      d.reject("You haven't drawn anything.");
      d.promise();
      return d;
    }
    img = $lc.canvasForExport().toDataURL().split(',')[1];
    $.ajax({
      url: 'http://api.imgur.com/2/upload.json',
      type: 'POST',
      data: {
        type: 'base64',
        key: imgurKey,
        name: opts.name,
        title: opts.title,
        caption: opts.caption,
        image: img
      },
      dataType: 'json',
      success: function(data) {
        return d.resolve(data.upload.links.imgur_page);
      },
      error: function(rsp) {
        d.reject("Image upload failed.");
        return console.log(rsp);
      }
    });
    d.promise();
    return d;
  };

  $(document).ready(function() {
    var $button, $el, $lc, $urlEl, el,
      _this = this;
    $lc = $('.literally').literallycanvas({
      backgroundColor: 'whiteSmoke'
    });
    el = $('.share-to-imgur').get(0);
    $el = $(el);
    $button = $el.find('button');
    $urlEl = $el.find('.imgur-url');
    $button.click(function(e) {
      $urlEl.html('Uploading...');
      $button.attr('disabled', 'disabled');
      return uploadToImgur($lc, '9600756ae5f127ca192d991140ee28c4').done(function(url) {
        return $el.find('.imgur-url').html($('<a href="' + url + '">' + url + '</a>'));
      }).fail(function(msg) {
        return $urlEl.html(_.escape(msg));
      }).always(function() {
        return $button.removeAttr('disabled');
      });
    });
    $('.get-image').click(function(e) {
      return window.open($('.literally').canvasForExport().toDataURL());
    });
    return $('.literally').resizable();
  });

}).call(this);
