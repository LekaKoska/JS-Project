## Products — komande

```bash
./vendor/bin/sail up -d                # pokreni kontejnere
./vendor/bin/sail artisan migrate      # napravi tabele
./vendor/bin/sail artisan db:seed      # popuni products test podacima
./vendor/bin/sail artisan migrate:fresh --seed   # reset baze + seed u jednom koraku
./vendor/bin/sail artisan tinker --execute="\App\Models\Product::factory(20)->create();"   # direktno pokreni factory
./vendor/bin/sail npm install          # instaliraj JS zavisnosti
./vendor/bin/sail npm run build        # build front-end asseta
./vendor/bin/sail npm run dev          # dev mode sa hot-reload-om
```

Stranica: `http://localhost/` (ili `:8080` ako je port menjan u `.env`).
