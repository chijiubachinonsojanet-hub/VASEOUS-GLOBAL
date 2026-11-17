const url = 'https://uwjikkcfnfnqhmqcnkvp.supabase.co';
const anon = 'sb_publishable_ep_zZzANnzxameisnT_LTA_UWd4amjn';

async function api(path) {
  const res = await fetch(url + path, {
    headers: {
      apikey: anon,
      Authorization: 'Bearer ' + anon,
      'Content-Type': 'application/json',
    },
  });

  const text = await res.text();
  console.log('PATH', path, 'STATUS', res.status);
  console.log(text.slice(0, 800));
}

(async () => {
  await api('/rest/v1/enquiries?select=*');
  await api('/rest/v1/email_subscribers?select=*');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
