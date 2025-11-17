import { Octokit } from '@octokit/rest';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function createRepository() {
  try {
    const octokit = await getGitHubClient();
    
    // Get the authenticated user
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`✓ Authenticated as: ${user.login}`);
    
    // Create the repository
    const repoName = 'larp-event-tracker';
    const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
      name: repoName,
      description: 'LARP Event Tracking Application for World\'s Edge 2024',
      private: false,
      auto_init: false,
    });
    
    console.log(`\n✓ Repository created successfully!`);
    console.log(`  Name: ${repo.name}`);
    console.log(`  URL: ${repo.html_url}`);
    console.log(`  Clone URL: ${repo.clone_url}`);
    console.log(`  SSH URL: ${repo.ssh_url}`);
    
    console.log(`\n📋 Next steps:`);
    console.log(`  1. Your repository is ready at: ${repo.html_url}`);
    console.log(`  2. Replit will automatically sync your code to GitHub`);
    console.log(`  3. You can view your code at: ${repo.html_url}`);
    
    return repo;
  } catch (error: any) {
    if (error.status === 422 && error.message.includes('already exists')) {
      console.log('\n⚠️  Repository "larp-event-tracker" already exists on your GitHub account.');
      console.log('   You can either:');
      console.log('   1. Delete the existing repository and run this script again');
      console.log('   2. Use a different repository name by modifying this script');
      const octokit = await getGitHubClient();
      const { data: user } = await octokit.rest.users.getAuthenticated();
      console.log(`\n   Existing repository: https://github.com/${user.login}/larp-event-tracker`);
    } else {
      console.error('Error creating repository:', error.message);
      throw error;
    }
  }
}

createRepository();
