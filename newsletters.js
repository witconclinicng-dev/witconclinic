// Supabase configuration for Witcon Clinic Newsletters
const supabaseUrl = 'https://npnzcpuiboxdxkfumvmh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbnpjcHVpYm94ZHhrZnVtdm1oIiwicm9sZSI6ImFubCI6ImFub24iLCJpYXQiOjE3NzI1NjMwODMsImV4cCI6MjA4ODEzOTA4M30.P8wd5Z7wdWroZ1XE5p80FN2PbWYOO2wCRPXIlA5pUDU';

// Initialize Supabase client
const supabase = supabase.createClient ? supabase.createClient(supabaseUrl, supabaseKey) : null;

// Function to fetch newsletters from Supabase
async function fetchNewsletters() {
  if(!supabase) { 
    console.log('Supabase not configured'); 
    return; 
  }

  let { data, error } = await supabase
    .from('newsletters')
    .select('*')
    .order('date', { ascending: false });

  if(error) { 
    console.log(error); 
    return; 
  }

  const container = document.getElementById('newsletters-container');
  container.innerHTML = '';

  data.forEach(n => {
    container.innerHTML += `
      <div class="service-card">
        <h3>${n.title}</h3>
        <p>${new Date(n.date).toLocaleDateString()}</p>
        <p>${n.content}</p>
      </div>`;
  });
}

// Fetch newsletters on page load
fetchNewsletters();