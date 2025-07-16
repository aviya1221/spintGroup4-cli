import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import GroupsModal from './GroupsModal';
import MembersModal from './MembersModal';

export default function HomePage() {
  const [memberCount, setMemberCount] = useState('...');
  const [groupCount, setGroupCount] = useState('...');
  const [biggestGroup, setBiggestGroup] = useState({ group_name: '', memberCount: 0, group_id: null });
  const [biggestCity, setBiggestCity] = useState({ city: '', count: 0 });

  const [showGroupsModal, setShowGroupsModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [membersInGroup, setMembersInGroup] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/members/getCountMembers')
      .then((res) => res.json())
      .then((data) => setMemberCount(data))
      .catch(() => setMemberCount('❌ Error'));

    fetch('/api/groups/getCountGroups')
      .then((res) => res.json())
      .then((data) => setGroupCount(data))
      .catch(() => setGroupCount('❌ Error'));

    fetch('/api/groups/getBiggestGroup')
      .then((res) => res.json())
      .then((data) => setBiggestGroup(data))
      .catch(() => setBiggestGroup({ group_name: 'Error', memberCount: 0, group_id: null }));

    fetch('/api/members/getBiggestCity')
      .then((res) => res.json())
      .then((data) => setBiggestCity(data))
      .catch(() => setBiggestCity({ city: 'Error', count: 0 }));
  }, []);

  const handleCardClick = async (type) => {
    if (type === 'members') {
      navigate('members');
    } else if (type === 'groups') {
      setShowGroupsModal(true);
    } else if (type === 'biggestGroup') {
      try {
        setShowMembersModal(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const cards = [
    {
      title: 'Total Members',
      value: memberCount,
      icon: '👥',
      bgColor: '#e3f2fd',
      onClick: () => handleCardClick('members')
    },
    {
      title: 'Total Groups',
      value: groupCount,
      icon: '📚',
      bgColor: '#e8f5e9',
      onClick: () => handleCardClick('groups')
    },
    {
      title: 'Biggest Group',
      value: biggestGroup.group_name ? `${biggestGroup.group_name} (${biggestGroup.memberCount})` : '...',
      icon: '🏆',
      bgColor: '#fff8e1',
      onClick: () => handleCardClick('biggestGroup')
    },
    {
      title: 'Top City',
      value: biggestCity.city ? `${biggestCity.city} (${biggestCity.count})` : '...',
      icon: '🏙️',
      bgColor: '#f3e5f5',
      onClick: null
    }
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">📊 Dashboard Overview</h1>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            className="info-card"
            key={index}
            onClick={card.onClick}
            style={{ backgroundColor: card.bgColor, cursor: card.onClick ? 'pointer' : 'default' }}
          >
            <div className="info-icon">{card.icon}</div>
            <div className="info-title">{card.title}</div>
            <div className="info-value">{card.value}</div>
          </div>
        ))}
      </div>

      <GroupsModal show={showGroupsModal} onClose={() => setShowGroupsModal(false)} />
      <MembersModal  group_id= {biggestGroup.group_id} show={showMembersModal} onClose={() => setShowMembersModal(false)}  />
    </div>
  );
}