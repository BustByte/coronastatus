export class CacheWithLifetime<T> {
  private cachedElements?: T;
  private cacheLifetimeInMinutes: number;
  private cacheName: string;
  private validTo?: number;

  constructor(cacheLifetimeInMinutes = 1, cacheName = 'CacheWithLifetime') {
    this.cacheLifetimeInMinutes = cacheLifetimeInMinutes;
    this.cacheName = cacheName;
    console.log(
      `${this.logTimestamp()}: ${this.cacheName} - setting up cache...`
    );
  }

  async getCachedElements(fetchNewElements: () => Promise<T>): Promise<T> {
    if (!this.cachedElements || this.cacheNeedsRefresh()) {
      this.cachedElements = await fetchNewElements();
      console.log(
        `${this.logTimestamp()}: ${this.cacheName} - cache cold, refreshing...`
      );
      this.scheduleCacheInvalidation();
    }
    return this.cachedElements;
  }

  private cacheNeedsRefresh(): boolean {
    return !this.validTo || this.validTo < new Date().getTime();
  }

  private scheduleCacheInvalidation(): void {
    const cacheLifetimeInMillis = this.cacheLifetimeInMinutes * 1000 * 60;
    this.validTo = new Date().getTime() + cacheLifetimeInMillis;
  }

  private logTimestamp(): string {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
