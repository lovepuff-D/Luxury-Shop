const storiesEl = document.querySelector('.stories')

if (storiesEl) {
  const groups = Array.from(document.querySelectorAll('.stories__group'))
  const activatorButtons = Array.from(document.querySelectorAll('div[data-story-open-key]'))
  storiesEl.story = {
    groups: []
  }
  groups.forEach(group => {
    const stories = Array.from(group.querySelectorAll('.stories__item'))
    const slider = group.querySelector('.stories__slider')
    const prevStoryBtn = group.querySelector('button[data-prev-stories-item]')
    const nextStoryBtn = group.querySelector('button[data-next-stories-item]')
    const sliderIndicators = []

    for (let i = 0; i < stories.length; i++) {
      const indicator = document.createElement('div')
      /* if (i === 0) {
        indicator.classList.add('is-active')
      } */
      sliderIndicators.push(indicator)
      slider.insertAdjacentElement('beforeend', indicator)
      indicator.insertAdjacentElement('beforeend', document.createElement('div'))
    }

    // Instance
    group.stories = {
      prevStory: prevStory,
      nextStory: nextStory,
      stories: stories,
      sliderIndicators: sliderIndicators,
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
      evalBtn: activatorButtons.find(storyListItem => storyListItem.dataset.storyOpenKey === group.dataset.storyKey)
    }

    group.stories.evalBtn.story = group

    // Manually Switch
    let mouseDownTime

    group.querySelectorAll('.stories__header, .stories__actions').forEach(el => {
      el.addEventListener('mousedown', e => {
        e.stopPropagation()
      })
      el.addEventListener('mouseup', e => {
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
        const halfOfFrame = window.innerWidth / 2

        if (e.clientX > halfOfFrame) {
          nextStory(true)
        } else {
          prevStory(true)
        }
      } else {
        group.stories.timer.startTimer(group.stories.timer.leftTimeToNextSlider)
      }
    })

    function prevStory(isManually = false) {
      const indexActiveStory = findIndexActiveStory()
      if (stories[indexActiveStory - 1]) {
        if (isManually) group.stories.timer.stopTimer()
        setVisibilityToStory(indexActiveStory - 1, group)
      }
    }

    function nextStory(isManually = false) {
      const indexActiveStory = findIndexActiveStory()
      const activeGroup = groups.findIndex(storyItem => storyItem.classList.contains('is-active'))
      if (stories[indexActiveStory + 1]) {
        if (isManually) group.stories.timer.stopTimer()
        setVisibilityToStory(indexActiveStory + 1, group)
      } else {
        console.log('change to other group')
        const nextGroup = groups[activeGroup + 1]
        if (nextGroup) {
          console.log('nextGroup')
          setVisibilityToStory(0, nextGroup)
          groups[activeGroup].classList.remove('is-active')
          nextGroup.classList.add('is-active')
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

  function setVisibilityToStory(index, group) {
    document.querySelector('.stories__item.is-active')?.classList.remove('is-active')
    document.querySelector('.stories__slider .is-active')?.classList.remove('is-active')
    const story = group.stories.stories[index]
    group.stories.sliderIndicators[index].classList.add('is-active')
    story.classList.add('is-active')
    story.isStoryViewed = true
    /* group.stories.timer.startTimer() */

    console.log(group.stories.stories.map(el => el.isStoryViewed))

    if (group.stories.stories.length === group.stories.stories.filter(el => Boolean(el.isStoryViewed)).length) {
      group.stories.evalBtn.classList.add('stories-list__item--checked')
    }
  }

  activatorButtons.forEach(storiesListItem => {
    storiesListItem.addEventListener('click', () => {
      window.overlay.show()
      setTimeout(() => {
        window.overlay.el.addEventListener('onClickOutside', () => {
          const activeGroup = document.querySelector('.stories__group.is-active')
          console.log(activeGroup, 'activeGroup')
          activeGroup?.classList.remove('is-active')
          activeGroup?.stories.timer.stopTimer()
        })
      })
      storiesListItem.story.classList.add('is-active')
      setVisibilityToStory(0, storiesListItem.story)
    })
  })
  const closeBtns = document.querySelectorAll('button[data-close-stories]')
  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const activeGroup = document.querySelector('.stories__group.is-active')
      if (activeGroup) {
        activeGroup.classList.remove('is-active')
        activeGroup.stories.timer.stopTimer()
        window.overlay.hide()
      }
    })
  })
}