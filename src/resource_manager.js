export class ResourceManager {
    static instance = null;
    static getInstance() {
        if (!ResourceManager.instance)
            ResourceManager.instance = new ResourceManager();

        return ResourceManager.instance;
    }

    constructor() {
        if (ResourceManager.instance)
            return ResourceManager.instance;

        ResourceManager.instance = this;

        this.cache = {};
    }

    load(path) {
        return new Promise(resolve => {
            if (this.cache[path]) return resolve(this.cache[path]);

            const img = new Image();
            img.src = path;
            img.onload = () => {
                this.cache[path] = img;
                resolve(img);
            };
        });
    }
}