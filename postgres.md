## Timezone

    ALTER DATABASE postgres SET timezone TO 'Asia/Tokyo';
    SELECT pg_reload_conf();
