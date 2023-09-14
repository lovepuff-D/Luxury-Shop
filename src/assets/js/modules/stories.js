const storiesEl = document.querySelector('.stories')

if (storiesEl) {
  const groups = Array.from(document.querySelectorAll('.stories__group'))
  const storiesList = Array.from(document.querySelectorAll('div[data-story-open-key]'))
  storiesEl.story = {
    groups: []
  }
  groups.forEach(group => {
    const stories = Array.from(group.querySelectorAll('.stories__item'))
    const slider = group.querySelector('.stories__slider')
    const prevStoryBtn = group.querySelector('button[data-prev-stories-item]')
    const nextStoryBtn = group.querySelector('button[data-next-stories-item]')
    const sliderIndicators = []
    // Instance
    group.stories = {
      prevStory: prevStory,
      nextStory: nextStory,
      stories: stories,
      timer: {
        startTimer: startTimer,
        stopTimer: function () {
          this.timerStopTime = Date.now()
          clearTimeout(this.currentTimerId)
          console.log('Timer has stopped')
        },
        currentTimerId: null,
        timerStartTime: null,
        timerStopTime: null,
        leftTimeToNextSlider: null
      },
      evalBtn: storiesList.find(storyListItem => storyListItem.dataset.storyOpenKey === group.dataset.storyKey)
    }

    group.stories.evalBtn.story = group

    for (let i = 0; i < stories.length; i++) {
      const indicator = document.createElement('div')
      if (i === 0) {
        indicator.classList.add('is-active')
      }
      sliderIndicators.push(indicator)
      slider.insertAdjacentElement('beforeend', indicator)
      indicator.insertAdjacentElement('beforeend', document.createElement('div'))
    }

    // Manually Switch
    let mouseDownTime

    group.querySelectorAll('.stories__header, .stories__actions').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation()
      })
    })
    group.addEventListener('mousedown', (e) => {
      mouseDownTime = Date.now()
      sliderIndicators[findIndexActiveStory()].children[0].style.animationPlayState = 'paused'
      group.stories.timer.stopTimer()
    })
    group.addEventListener('mouseup', (e) => {
      const mouseUpTime = Date.now()
      const timeDifference = mouseUpTime - mouseDownTime
      group.stories.timer.leftTimeToNextSlider -= (group.stories.timer.timerStopTime - group.stories.timer.timerStartTime)
      sliderIndicators[findIndexActiveStory()].children[0].style.animationPlayState = 'running'

      if (timeDifference < 400) {
        const halfOfFrame = group.clientWidth / 2
        if (e.clientX > halfOfFrame) {
          nextStory(true)
        } else {
          prevStory(true)
        }
      } else {
        /* group.stories.timer.startTimer(group.stories.timer.leftTimeToNextSlider) */
      }
    })

    function prevStory(isManually = false) {
      const indexActiveStory = findIndexActiveStory()
      if (stories[indexActiveStory - 1]) {
        stories[indexActiveStory].classList.remove('is-active')
        stories[indexActiveStory - 1].classList.add('is-active')
        changeActiveSlider()
      }
    }

    function nextStory(isManually = false) {
      const indexActiveStory = findIndexActiveStory()
      const activeGroup = groups.findIndex(storyItem => storyItem.classList.contains('is-active'))
      if (stories[indexActiveStory + 1]) {
        stories[indexActiveStory].classList.remove('is-active')
        stories[indexActiveStory + 1].classList.add('is-active')
        changeActiveSlider()
        if (isManually) group.stories.timer.stopTimer()
        group.stories.timer.startTimer()

        stories[indexActiveStory + 1].isStoryViewed  = true
        console.log(group.stories.stories.length, group.stories.stories.filter(el => el.isStoryViewed).length)
        if (group.stories.stories.length === group.stories.stories.filter(el => el.isStoryViewed).length) {
          console.log('CHECKED ALL')
          group.stories.evalBtn.classList.add('stories-list__item--disabled')
        }
      } else {
        console.log('change to other group')

        const nextGroup = groups[activeGroup + 1]
        if (nextGroup) {
          const indexActiveStory = findIndexActiveStory()
          sliderIndicators[indexActiveStory].classList.remove('is-active')
          sliderIndicators[0].classList.add('is-active')

          stories[indexActiveStory].classList.remove('is-active')
          stories[0].classList.add('is-active')

          groups[activeGroup].classList.remove('is-active')
          nextGroup.classList.add('is-active')
          if (isManually) group.stories.timer.stopTimer()
          nextGroup.stories.timer.startTimer()
        } else {
          document.querySelector('.stories__group.is-active')?.classList.remove('is-active')
        }
        group.stories.timer.stopTimer()
      }
    }

    function startTimer(time = 3000) {
      console.log(time, 'time')
      group.stories.timer.timerStartTime = Date.now()
      group.stories.timer.leftTimeToNextSlider = time
      group.stories.timer.currentTimerId = setTimeout(() => {
        group.stories.nextStory()
      }, time)
      console.log('timer started', group.stories.timer.currentTimerId)
    }

    function findIndexActiveStory() {
      return stories.findIndex(storyItem => storyItem.classList.contains('is-active'))
    }

    function changeActiveSlider() {
      const indexActiveStory = findIndexActiveStory()
      sliderIndicators.forEach((indicator, index) => {
        if (index === indexActiveStory) {
          indicator.classList.add('is-active')
        } else {
          indicator.classList.remove('is-active')
        }
      })
    }
  })

  storiesList.forEach(storiesListItem => {
    storiesListItem.addEventListener('click', () => {
      storiesListItem.story.classList.add('is-active')
      storiesListItem.story.stories.timer.startTimer()
      storiesListItem.story.stories.stories[0].isStoryViewed = true
    })
  })

  const closeBtns = document.querySelectorAll('button[data-close-stories]')
  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const activeGroup = document.querySelector('.stories__group.is-active')
      if (activeGroup) {
        activeGroup.classList.remove('is-active')
        activeGroup.stories.timer.stopTimer()
      }
    })
  })
}