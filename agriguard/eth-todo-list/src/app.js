App = {
  loading: false,
  contracts: {},
  load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
      } else {
      window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
      } catch (error) {
          // User denied account access...
      }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
  },

  loadAccount: async () => {
      web3.eth.defaultAccount=web3.eth.accounts[0]
      // console.log(App.account)
  },

  loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const claimContract = await $.getJSON('ClaimContract.json')
      App.contracts.ClaimContract = TruffleContract(claimContract)
      App.contracts.ClaimContract.setProvider(App.web3Provider)

      // Hydrate the smart contract with values from the blockchain
      App.claimContract = await App.contracts.ClaimContract.deployed()
  },

  render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }
  
      // Update app loading state
      App.setLoading(true)
  
      // Render Account
      $('#account').html(App.account)
  
      // Render Tasks
      await App.renderTasks()
  
      // Update loading state
      App.setLoading(false)
    },

    submitClaim: async () => {
      App.setLoading(true)
      const content = $('#newTask').val()
      const loc = $('#location').val()
      const crop = $('#crop').val()
      const estimatedyeild = $('#estimatedyeild').val()
      const yeild = $('#yield').val()
      await App.claimContract.submitClaim(content, loc, crop, estimatedyeild, yeild)
      window.location.reload()
    },

    toggleCompleted: async (e) => {
      App.setLoading(true)
      const claimId = e.target.name
      await App.claimContract.toggleCompleted(claimId)
      window.location.reload()
    },

    renderTasks: async () => {
      // Load the total task count from the blockchain
      const claimCount = await App.claimContract.claimCount()
      const $taskTemplate = $('.taskTemplate')
  
      // Render out each task with a new task template
      for (var i = 1; i <= claimCount; i++) {
        // Fetch the task data from the blockchain
        const claim = await App.claimContract.claims(i)
        const claimId = claim[0].toNumber()
        const claimAmnt = claim[6]
        const claimVerified = claim[5]
  
        // Create the html for the task
        const $newTaskTemplate = $taskTemplate.clone()
        $newTaskTemplate.find('.content').html(claimAmnt)
        $newTaskTemplate.find('input')
                        .prop('name', claimId)
                        .prop('checked', claimVerified)
                        .on('click', App.toggleCompleted)
  
        // Put the task in the correct list
        if (claimVerified) {
          $('#completedTaskList').append($newTaskTemplate)
        } else {
          $('#taskList').append($newTaskTemplate)
        }
  
        // Show the task
        $newTaskTemplate.show()
      }
    },

    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
}

$(() => {
  $(window).load(() => {
      App.load()
  })
})