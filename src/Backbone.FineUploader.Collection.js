Backbone.FineUploader = Backbone.FineUploader || {};
Backbone.FineUploader.Collection = Backbone.Collection.extend({
    model: Backbone.Model,
    /**
     * @param {Array} models Backbone Collection default behavior but unused in this plugin.
     * @param {object} options
     * @param {object} options.uploaderOptions options sent to constructor of Fine Uploader
     */
    initialize: function(models, options) {
        if (typeof qq === "undefined" || typeof qq.FineUploaderBasic !== "function") {
            throw "Fine Uploader plugin is required. Please go to https://github.com/Widen/fine-uploader";
        }
        options = options || {};

        _.extend(options.uploaderOptions, {
            callbacks: {
                onComplete: _.bind(this.onComplete, this),
                onError: _.bind(this.onError, this),
                onSubmit: _.bind(this.onSubmit, this),
                onProgress: _.bind(this.onProgress, this),
                onTotalProgress: _.bind(this.onTotalProgress, this),
                onStatusChange: _.bind(this.onStatusChange, this),
                onAllComplete: _.bind(this.onAllComplete, this)
            }
        });

        this.uploader = new qq.FineUploaderBasic(options.uploaderOptions);
    },
    onComplete: function(id, name, response, xhr) {
        var model = this.get(id);
        model.set(response.data);
        model.trigger("complete", model, response, xhr);
    },
    onSubmit: function(id, name) {
        var model = this.get(id),
            uploader = this.uploader;
        model.set({
            name: name,
            file: this.uploader.getFile(id)
        });
        model.trigger("submit", model);
    },
    onError: function(id, name, error, xhr) {
        var model = this.get(id);
        model.trigger("error", model, error, xhr);
    },
    onProgress: function(id, name, uploadedBytes, totalBytes) {
        var model = this.get(id);
        model.set({
            name: name,
            uploadedBytes: uploadedBytes,
            totalBytes: totalBytes
        });
        model.trigger("progress", model);
    },
    onTotalProgress: function(uploadedBytes, totalBytes) {
        this.trigger("totalprogress", uploadedBytes, totalBytes);
    },
    onStatusChange: function(id, oldStatus, newStatus) {
        var model;
        if (oldStatus === null) {
            model = this.add({
                id: id,
                status: newStatus
            });
        } else {
            model = this.get(id);
            model.set('status', newStatus);
        }
    },
    onAllComplete: function(succeeded, failed) {
        this.trigger("done", succeeded, failed);
    }
});