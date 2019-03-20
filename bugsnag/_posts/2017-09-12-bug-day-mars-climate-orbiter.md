---
layout: post
title: "The Worst Computer Bugs in History: Rapid unanticipated disassembly of the Mars Climate Orbiter"
publish_date: September 12th, 2017
author_name: Jamie Lynch
author_twitter: fractalwrench
author_avatar: jamie
categories: community
hero_image: mars-climate-orbiter.jpg
---

> The Worst Computer Bugs in History is a mini series to commemorate [the discovery of the first computer bug](https://blog.bugsnag.com/bug-day-2017/) seventy years ago. Although these stories are more extreme than most software bugs engineers will encounter during their careers, they are worth studying for the insights they can offer into software development and deployment. These computer bugs left a significant impact on the people who experienced them, and we hope they’ll offer valuable lessons we can all apply to our own work and projects. Read about other computer bugs in the series: [The Ariane 5 Disaster](https://blog.bugsnag.com/bug-day-ariane-5-disaster/), [losing $460 million in 45 minutes](https://blog.bugsnag.com/bug-day-460m-loss/), and [Therac-25](https://blog.bugsnag.com/bug-day-race-condition-therac-25/).

### Mars Climate Orbiter

At 1:41AM Pacific Time on Thursday, September 23, 1999, the Mars Climate Orbiter stowed its solar arrays, to protect them from a temporary descent into the upper Martian atmosphere. Nine minutes later, the craft reoriented itself using its Reaction Control systems, to line up its main engine retrograde to Mars. At 2:01AM, the engine ignited for its main burn, which initiated a 40 day stretch of complex aerobraking maneuvers in the upper Martian atmosphere, conserving precious rocket fuel. At 2:06AM, the orbiter passed behind Mars, and radio communications from Earth were blocked for a nail-biting twenty-one minutes. Once having successfully entered orbit, the satellite was supposed to relay photos of Mars to Earth for several years.

But unfortunately, this did not happen as the craft was not on the correct trajectory. Instead, it had burned up in the Martian atmosphere nearly 24 hours earlier, lost without a trace. This is the story of the Rapid Unanticipated Disassembly of the Mars Climate Orbiter.

### The mission  

The $235m craft was intended to be the first ever weather satellite for Mars, which would monitor the planet's atmosphere with its high-resolution camera. Over the course of 687 days, or one Martian Year, the orbiter was supposed to monitor the planet's temperature, and relay photographs of dust storms back to ground control on Earth.

The satellite was also supposed to function as a communications relay for the ill-fated Mars Polar Lander mission. The Mars Polar Lander similarly encountered a Rapid Unanticipated Disassembly in the final stages, which was probably due to a software and mechanical bug with the landing legs prematurely shutting down the main engine. But that's [a whole different story](https://spaceflight.nasa.gov/spacenews/releases/2000/mpl/mpl_report_1.pdf).

### What exactly went wrong?

#### Cosmic radiation

As with many software bugs, the root cause of this error is a long chain of events which would make any engineer wake up in a cold sweat in the middle of the night. Firstly, on the nine-month journey, the spacecraft had been scheduled to perform propulsion maneuvers, to prevent the craft's reaction control wheels from gaining too much angular momentum.

These Angular Movement Desaturation (AMD) maneuvers occurred ten times more than predicted, due to the asymmetric arrangement of solar panels on the craft. This is due to the [solar sail effect](https://en.wikipedia.org/wiki/Solar_sail), where photons from the Sun exert a force on the craft and cause it to rotate. Although these forces are relatively tiny, over a trip of 196 million kilometers, their effects compounded so that the spacecraft was approximately 170km away from its desired trajectory.

#### Ground Control software

The second factor was a bug in the ground control software supplied by Lockheed Martin, which displayed the force for each AMD maneuver. The software calculated the value in an imperial unit, pound-seconds, whereas the software built by NASA expected the value to be in a metric unit, newton-seconds. As these values were not correctly converted, this led to small discrepancies in the position of the spacecraft, which compounded over a course of millions of miles.

#### Human error

The third and final factor was human error. Quality Assurance had not found the use of an imperial unit in external software, despite the fact that NASA's coding standards at the time mandated use of metric units.

In fact, for the first four months of navigation, NASA had relied on email notifications from the contractor to determine that the spacecraft was rotating. Calculations were also performed manually rather than using the supplied software, due to file format errors and miscellaneous bugs.

### The aftermath
Communication between teams and training of the operations staff is cited as a contributing factor in NASA's investigation report. A chance was missed to perform a contingency trajectory correction, despite members of staff later recollecting they had all agreed on executing the maneuver. Navigation staff were also controlling three separate missions simultaneously, which may have diluted their attention from discrepancies in the trajectory.

Other recommendations from NASA included better training of navigation staff, and delegating ownership of different aspects of the missions to specific staff, such as the responsibility for deciding when to execute maneuvers. Another very important recommendation was to audit all software for the use of imperial units.

---

Our series on the Worst Software Bugs in History is in honor of [Bug Day 2017](https://blog.bugsnag.com/bug-day-2017/). Seventy years ago, Grace Hopper discovered the first computer bug — a moth was stuck between relays in the Harvard Mark II computer she was working on. The notion of bugs was described in other fields previously, but the moth discovery was the first use of the term “debugging” in the field of computers.

[Bugsnag](https://www.bugsnag.com) automatically monitors your applications for harmful errors and alerts you to them, giving you visibility into the stability of your software. You can think of us as mission control for software quality.

---
Sources:  
[https://en.wikipedia.org/wiki/Mars_Climate_Orbiter#Cause_of_failure](https://en.wikipedia.org/wiki/Mars_Climate_Orbiter#Cause_of_failure)  
[http://www.cnn.com/TECH/space/9909/30/mars.metric.02/index.html](http://www.cnn.com/TECH/space/9909/30/mars.metric.02/index.html)  
[https://www2.jpl.nasa.gov/files/misc/mcoarrivehq.pdf](https://www2.jpl.nasa.gov/files/misc/mcoarrivehq.pdf)  
[https://llis.nasa.gov/llis_lib/pdf/1009464main1_0641-mr.pdf](https://llis.nasa.gov/llis_lib/pdf/1009464main1_0641-mr.pdf)
