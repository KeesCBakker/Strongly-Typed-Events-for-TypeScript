window.onload = () => {

    let downloader = new ImageDownloader();

    downloader.ondownload.subscribe((arg: ImageDownloadArg) => {
        var x = `Url: "${arg.url}", height: ${arg.height}, width: ${arg.width}`;
        alert(x);
    });

    downloader.download('https://keestalkstech.com/wp-content/uploads/2016/05/pexels-photo-688991.jpeg', (arg: ImageDownloadArg) => alert(`"${arg.url}"' has been downloaded!`));
    downloader.download('https://keestalkstech.com/wp-content/uploads/2016/05/hashing2-590x332.jpg');
    downloader.download('https://keestalkstech.com/wp-content/uploads/2016/05/pexels-photo-688991-590x393.jpeg');
};

class ImageDownloader {

    private _ondownload: SimpleEventDispatcher<ImageDownloadArg> = new SimpleEventDispatcher();

    public get ondownload(): ISimpleEvent<ImageDownloadArg> {
        return this._ondownload;
    }

    public download(url: string, callback?: ISimpleEventHandler<ImageDownloadArg>) {

        let img = new Image();

        img.onload = () => {

            let result = new ImageDownloadArg(url, img.height, img.width);

            if (callback) {
                callback(result);
            }

            this._ondownload.dispatch(result);
        };

        img.src = url;
    }
}

class ImageDownloadArg {

    private _url: string;
    private _height: number;
    private _width: number;

    constructor(url: string, height: number, width: number) {
        this._url = url;
        this._height = height;
        this._width = width;
    }

    public get url(): string {
        return this._url;
    }

    public get height(): number {
        return this._height;
    }

    public get width(): number {
        return this._width;
    }
}
