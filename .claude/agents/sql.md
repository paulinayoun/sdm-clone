API 1: 층별 알람 통계

	// GET /api/alarm/floor-stats

	SELECT te.bldgID, te.floorID, count(*) AS alertCount
	FROM tbEvent te
	WHERE te.eventCode='01'
	AND te.eventVal=1
	GROUP BY te.floorID
	ORDER BY te.floorID;

  {
    centerAlarmStat: [
      {
        'A동': [
          { floorID: 1, floorName: '1F', alertCount: 3 }
        ],
        total: 3
      }
    ]
  }

  API 2: 공간별 알람 통계

  // GET /api/alarm/space-stats

	SELECT te.spaceID, count(*) AS alertCount
	FROM tbEvent te
	WHERE te.eventCode='01'
	AND te.eventVal=1
	GROUP BY te.spaceID
	ORDER BY te.spaceID;
  {
    spaceAlarmStat: [
      { spaceID: 1, spaceName: '기계실-1', floorID: 1, alertCount: 2 },
      { spaceID: 3, spaceName: '서버실-1', floorID: 1, alertCount: 1 }
    ]
  }

centerAlarmStat: [
	{A동: [ { floorID: , floorName: , alertCount: },...], total:100 },
	{B동: [
		{
		 floorID: ,
		 floorName: ,
		 alertCount: 
		},
		...
	]}
]
       

centerAlarmStat[0]['total'];

for(...)
centerAlarmStat[0]['A동'];